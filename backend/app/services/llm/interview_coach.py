import json
from openai import OpenAI
from app.core.config import settings
from typing import Optional

# Use Google Gemini via its OpenAI-compatible endpoint
client = OpenAI(
    api_key=settings.GEMINI_API_KEY,
    base_url=settings.GEMINI_BASE_URL
) if settings.GEMINI_API_KEY else None

def evaluate_interview_answer(question: str, answer: str, resume_text: str) -> dict:
    """
    Evaluate an interview answer using AI.
    """
    if client is None:
        return {
            "score": 75,
            "feedback": "Answer received. STAR method coaching unavailable without API key.",
            "tips": ["Use the STAR method", "Provide more metrics"]
        }

    # Explicit narrowing for linter
    res_str: str = str(resume_text or "")
    res_context = res_str[:1000]

    prompt = f"""
    Evaluate the following interview answer.
    Question: {question}
    Answer: {answer}
    Candidate Resume Context: {res_context}

    Respond with ONLY valid JSON (no markdown, no explanation):
    {{"score": <int 0-100>, "feedback": "<STAR method feedback>", "tips": ["<tip 1>", "<tip 2>"]}}
    """

    try:
        response = client.chat.completions.create(
            model=settings.GEMINI_MODEL,
            messages=[{"role": "user", "content": prompt}]
        )
        raw_content = response.choices[0].message.content
        if not raw_content:
            return {"error": "No content received from AI.", "score": 0, "feedback": "Evaluation failed: No content.", "tips": []}
        return json.loads(raw_content)
    except Exception as e:
        return {"error": str(e), "score": 0, "feedback": f"Evaluation failed: {str(e)}", "tips": []}
