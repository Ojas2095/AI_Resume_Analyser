from fastapi import APIRouter, HTTPException, Body
from app.services.llm.optimizer import optimize_bullet
from typing import Optional

router = APIRouter()

@router.post("/optimize/bullet")
async def optimize_resume_bullet(
    bullet_point: str = Body(..., embed=True),
    context: Optional[str] = Body(None, embed=True)
):
    if not bullet_point.strip():
        raise HTTPException(status_code=400, detail="Bullet point cannot be empty.")
    
    try:
        optimized = optimize_bullet(bullet_point, context)
        return {"original": bullet_point, "optimized": optimized}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
