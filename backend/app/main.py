from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logger import logger
from app.api.v1.health import router as health_router
from app.api.v1.resume import router as resume_router
from app.api.v1.optimization import router as optimization_router
from app.api.v1.generation import router as generation_router
from app.api.v1.export import router as export_router
from app.api.v1.interview import router as interview_router
from app.api.v1.roles import router as roles_router
from app.api.v1.hr import router as hr_router


app = FastAPI(title="AI Resume Reviewer")

# CORS Configuration — must be registered BEFORE routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://ai-resume-analyser-chi-liard.vercel.app",
        "https://ai-resume-analyser.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",  # covers all Vercel preview URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to AI Resume Reviewer API",
        "docs": "/docs",
        "health": "/api/v1/health"
    }

app.include_router(health_router, prefix="/api/v1")
app.include_router(resume_router, prefix="/api/v1")
app.include_router(optimization_router, prefix="/api/v1")
app.include_router(generation_router, prefix="/api/v1")
app.include_router(export_router, prefix="/api/v1")
app.include_router(interview_router, prefix="/api/v1")
app.include_router(roles_router, prefix="/api/v1")
app.include_router(hr_router, prefix="/api/v1")
