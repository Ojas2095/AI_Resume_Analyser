from fastapi import APIRouter, UploadFile, File, HTTPException, Query, Form
from typing import Optional
from app.services.analysis.role_loader import load_role
from app.services.analysis.role_matcher import match_role

from app.services.parser.pdf_parser import extract_text_from_pdf
from app.services.parser.docx_parser import extract_text_from_docx
from app.services.parser.cleaner import clean_text
from app.services.sectioning.section_detector import detect_sections
from app.services.nlp.skill_extractor import extract_skills
from app.services.scoring.scorer import calculate_score
from app.services.llm.suggestions import generate_suggestions
from app.services.ml_engine.ats_parser import calculate_ats_structural_score
from app.services.ml_engine.semantic_matcher import calculate_semantic_match
from app.services.ml_engine.readability_scorer import analyze_readability_and_cliches
from app.core.logger import logger

router = APIRouter()

@router.post("/resume/upload")
async def upload_resume(
    file: UploadFile = File(...), 
    role: str = Query(..., description="Target job role"),
    jd_text: Optional[str] = Form(None)
):
    # Input validation
    if file.size is not None and file.size > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=400, detail="File too large. Max size is 10MB.")
    
    if file.content_type not in ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]:
        raise HTTPException(status_code=400, detail="Unsupported file type. Only PDF and DOCX are allowed.")

    content = await file.read()
    raw_text = ""

    try:
        filename = (file.filename or "").lower()
        if filename.endswith(".pdf") or file.content_type == "application/pdf":
            raw_text = extract_text_from_pdf(content)
        elif filename.endswith(".docx") or file.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            raw_text = extract_text_from_docx(content)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type. Please upload a PDF or DOCX.")
            
        if not raw_text.strip():
             raise ValueError("Could not extract any text from the provided file.")
             
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing resume: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

    cleaned = clean_text(raw_text)
    sections = detect_sections(cleaned)
    skills = extract_skills(sections)
    
    try:
        role_data = load_role(role)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"Role '{role}' not found.")
    
    role_match = match_role(skills, role_data)
    score = calculate_score(role_match, sections)
    suggestions = generate_suggestions(role_match, skills, sections, jd_text)
    
    # Run the offline ML engines
    ats_score = calculate_ats_structural_score(cleaned, sections)
    readability_score = analyze_readability_and_cliches(cleaned)
    semantic_score = calculate_semantic_match(cleaned, jd_text) if jd_text else None

    # Simplified Heatmap Data: Skills found + strength based on mentions/importance
    # In a real app, this would be more sophisticated
    keyword_heatmap = [
        {"keyword": skill, "strength": min(100, len(data["mentions_in"]) * 20 + 20)} 
        for skill, data in skills.items()
    ]

    return {
        "filename": file.filename,
        "resume_text": cleaned,
        "role_match": role_match,
        "score": score,
        "ats_metrics": ats_score,
        "readability_metrics": readability_score,
        "semantic_match": semantic_score,
        "suggestions": suggestions,
        "keyword_heatmap": keyword_heatmap,
        "jd_provided": bool(jd_text),
        "jd_text": jd_text
    }
