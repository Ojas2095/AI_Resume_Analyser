from fastapi import APIRouter, HTTPException, Body
from app.services.llm.generation import generate_cover_letter
from typing import Optional

router = APIRouter()

@router.post("/generate/cover-letter")
async def create_cover_letter(
    resume_text: str = Body(..., embed=True),
    jd_text: str = Body(..., embed=True),
    extra_context: Optional[str] = Body(None, embed=True)
):
    if not resume_text.strip() or not jd_text.strip():
        raise HTTPException(status_code=400, detail="Resume and Job Description are required.")
    
    try:
        cover_letter = generate_cover_letter(resume_text, jd_text, extra_context)
        return {"cover_letter": cover_letter}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
