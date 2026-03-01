from openai import OpenAI
from app.core.config import settings
from typing import Optional

# Use Google Gemini via its OpenAI-compatible endpoint
client = OpenAI(
    api_key=settings.GEMINI_API_KEY,
    base_url=settings.GEMINI_BASE_URL
) if settings.GEMINI_API_KEY else None

def generate_cover_letter(resume_text: str, jd_text: str, context: Optional[str] = None) -> str:
    """
    Generate a tailored cover letter based on resume and job description.
    """
    if client is None:
        return (
            "Dear Hiring Manager,\n\n"
            "I am writing to express my strong interest in the role. "
            "My experience aligns well with the requirements listed in your job description. "
            "Thank you for your consideration.\n\n"
            "[AI Key Missing - Generic Template Provided]"
        )

    # Null-safe slicing with explicit narrowing for linter
    res_snippet = resume_text[:2000] if isinstance(resume_text, str) else ""
    jd_snippet = jd_text[:2000] if isinstance(jd_text, str) else ""

    prompt = f"""
    Write a professional, tailored cover letter based on the following:

    RESUME CONTENT:
    {res_snippet}

    JOB DESCRIPTION:
    {jd_snippet}

    {f"ADDITIONAL CONTEXT: {context}" if isinstance(context, str) and context else ""}

    Rules:
    - Highly professional and persuasive tone.
    - Highlight specific skills from the resume that match the JD.
    - Keep it under 400 words.
    - Use placeholders like [Hiring Manager Name] if not specified.
    - Format with clear paragraphs.
    """

    try:
        response = client.chat.completions.create(
            model=settings.GEMINI_MODEL,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=800,
            temperature=0.7
        )
        raw_content = response.choices[0].message.content
        if not raw_content:
            return "Error: No content received from AI."
        return raw_content.strip()
    except Exception as e:
        return f"Error generating cover letter: {str(e)}"
