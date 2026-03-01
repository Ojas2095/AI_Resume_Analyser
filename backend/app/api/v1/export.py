from fastapi import APIRouter, HTTPException, Body
from fastapi.responses import Response
from app.services.export.pdf_generator import generate_resume_pdf
from typing import Dict, Any

router = APIRouter()

@router.post("/export/pdf")
async def export_pdf(
    resume_text: str = Body(..., embed=True),
    role: str = Body(..., embed=True),
    score: Dict[str, Any] = Body(..., embed=True)
):
    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text is required for export.")
    
    try:
        pdf_content = generate_resume_pdf(resume_text, role, score)
        return Response(
            content=pdf_content,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=Optimized_Resume_{role.replace(' ', '_')}.pdf"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF: {str(e)}")
