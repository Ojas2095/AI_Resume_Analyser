from fastapi import APIRouter, HTTPException, Body
from app.services.llm.interview_coach import evaluate_interview_answer
from typing import Optional

router = APIRouter()

@router.post("/interview/evaluate")
async def evaluate_answer(
    question: str = Body(..., embed=True),
    answer: str = Body(..., embed=True),
    resume_context: Optional[str] = Body("", embed=True)
):
    if not question.strip() or not answer.strip():
        raise HTTPException(status_code=400, detail="Question and answer are required.")
    
    try:
        feedback = evaluate_interview_answer(question, answer, resume_context)
        return {"feedback": feedback}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
