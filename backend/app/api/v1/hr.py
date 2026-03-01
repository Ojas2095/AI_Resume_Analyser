"""
HR Bulk Screening API endpoint.

POST /api/v1/hr/bulk-screen
  - files: List[UploadFile] (PDF or DOCX, up to 100 files)
  - role: str
  - jd_text: str (optional)

Returns all candidates ranked and grouped into priority tiers.
"""
import asyncio
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List, Optional
from app.services.parser.pdf_parser import extract_text_from_pdf
from app.services.parser.docx_parser import extract_text_from_docx
from app.services.parser.cleaner import clean_text
from app.services.sectioning.section_detector import detect_sections
from app.services.nlp.skill_extractor import extract_skills
from app.services.analysis.role_matcher import match_role
from app.services.analysis.resume_ranker import score_resume, assign_tier, group_by_tier
from app.services.nlp.name_extractor import extract_name

router = APIRouter()

ALLOWED_TYPES = {
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}


async def process_single_resume(file: UploadFile, role: str) -> dict:
    """Parse, extract, and score a single resume file."""
    filename = file.filename or 'unknown'
    try:
        contents = await file.read()
        content_type = file.content_type or ''

        # Parse text
        if 'pdf' in content_type or filename.endswith('.pdf'):
            text = extract_text_from_pdf(contents)
        elif 'wordprocessingml' in content_type or filename.endswith('.docx'):
            import io
            from docx import Document
            doc = Document(io.BytesIO(contents))
            text = '\n'.join([p.text for p in doc.paragraphs])
        else:
            return {'filename': filename, 'error': 'Unsupported file type', 'score': 0, 'tier': 4, 'label': 'Not Qualified', 'color': 'red'}

        text = clean_text(text)
        if not text.strip():
            return {'filename': filename, 'error': 'Could not extract text', 'score': 0, 'tier': 4, 'label': 'Not Qualified', 'color': 'red'}

        # Analysis pipeline
        sections = detect_sections(text)
        skills_data = extract_skills(sections)
        role_data = match_role(skills_data.get('all_found', []), role)

        matched = role_data.get('required', {}).get('matched', [])
        missing = role_data.get('required', {}).get('missing', [])
        nice_matched = role_data.get('nice_to_have', {}).get('matched', [])
        nice_missing = role_data.get('nice_to_have', {}).get('missing', [])

        composite_score = score_resume(
            matched_skills=matched,
            missing_skills=missing,
            nice_matched=nice_matched,
            nice_missing=nice_missing,
            sections=sections,
            full_text=text,
        )

        tier_info = assign_tier(composite_score)
        candidate_name = extract_name(text)

        return {
            'filename': filename,
            'name': candidate_name,
            'score': composite_score,
            'tier': tier_info['tier'],
            'label': tier_info['label'],
            'color': tier_info['color'],
            'matched_skills': matched,
            'missing_skills': missing,
            'nice_matched': nice_matched,
            'skill_coverage': round(len(matched) / max(len(matched) + len(missing), 1) * 100, 1),
            'error': None,
        }
    except Exception as e:
        return {
            'filename': filename,
            'name': 'Unknown',
            'score': 0,
            'tier': 4,
            'label': 'Not Qualified',
            'color': 'red',
            'matched_skills': [],
            'missing_skills': [],
            'nice_matched': [],
            'skill_coverage': 0,
            'error': str(e),
        }


@router.post('/hr/bulk-screen')
async def bulk_screen_resumes(
    files: List[UploadFile] = File(...),
    role: str = Form(...),
    jd_text: Optional[str] = Form(None),
):
    if not files:
        raise HTTPException(status_code=400, detail='No files uploaded.')
    if len(files) > 200:
        raise HTTPException(status_code=400, detail='Maximum 200 files per batch.')

    # Validate all file types before processing
    for f in files:
        ct = f.content_type or ''
        fn = f.filename or ''
        if 'pdf' not in ct and 'wordprocessingml' not in ct and not fn.endswith(('.pdf', '.docx')):
            raise HTTPException(status_code=400, detail=f'File {fn} is not a PDF or DOCX.')

    # Process all resumes concurrently
    tasks = [process_single_resume(f, role) for f in files]
    candidates = await asyncio.gather(*tasks)

    # Sort by score descending
    sorted_candidates = sorted(candidates, key=lambda x: x['score'], reverse=True)

    # Group into tiers
    tiers = group_by_tier(sorted_candidates)

    return {
        'role': role,
        'total': len(candidates),
        'summary': {
            'tier1': len(tiers['tier1']),
            'tier2': len(tiers['tier2']),
            'tier3': len(tiers['tier3']),
            'rejected': len(tiers['rejected']),
        },
        **tiers,
    }
