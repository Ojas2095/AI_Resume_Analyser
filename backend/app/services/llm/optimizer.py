from openai import OpenAI
from app.core.config import settings
from typing import Optional

# Use Google Gemini via its OpenAI-compatible endpoint
client = OpenAI(
    api_key=settings.GEMINI_API_KEY,
    base_url=settings.GEMINI_BASE_URL
) if settings.GEMINI_API_KEY else None

def optimize_bullet(bullet_point: str, context: Optional[str] = None) -> str:
    """
    Optimize a resume bullet point using the Google XYZ formula.
    XYZ: Accomplished [X] as measured by [Y], by doing [Z].
    """
    if client is None:
        return "Accomplished a key task (X) with significant impact (Y) by implementing strategic solutions (Z). [AI Key Missing]"

    # Explicit type narrowing for linter safety
    bullet_text = bullet_point if isinstance(bullet_point, str) else ""
    ctx_text = context if isinstance(context, str) else ""

    prompt = f"""
    Optimize the following resume bullet point using the Google XYZ Formula:
    "Accomplished [X] as measured by [Y], by doing [Z]"

    Original Bullet: {bullet_text}
    {f"Context/Role: {ctx_text}" if ctx_text else ""}

    Provide ONLY the optimized bullet point text. Keep it professional, concise, and impact-driven.
    """

    try:
        response = client.chat.completions.create(
            model=settings.GEMINI_MODEL,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150,
            temperature=0.7
        )
        raw_content = response.choices[0].message.content
        if not raw_content:
            return "Error: No content received from AI."
        return raw_content.strip().replace('"', '')
    except Exception as e:
        return f"Error: {str(e)}"
