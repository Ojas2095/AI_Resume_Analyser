from openai import OpenAI
from app.core.config import settings
from typing import Optional

# Use Google Gemini via its OpenAI-compatible endpoint
# The `openai` library works unchanged — only base_url, api_key, and model differ.
client = OpenAI(
    api_key=settings.GEMINI_API_KEY,
    base_url=settings.GEMINI_BASE_URL
) if settings.GEMINI_API_KEY else None

def generate_suggestions(role_match: dict, skills: dict, sections: dict, jd_text: Optional[str] = None) -> str:
    """
    Generate AI-powered suggestions for resume improvement using LLM.
    """
    if client is None:
        return "LLM suggestions unavailable: API key not configured."

    # Ultra-strict type narrowing for the linter
    jd_context = ""
    if jd_text:
        jd_str: str = str(jd_text)
        jd_snippet = jd_str[:1000]
        jd_context = f"\n- Additional Context (Target Job Description): {jd_snippet}..."

    # Ensure sections and values are handled safely
    sections_list = []
    if isinstance(sections, dict):
        sections_list = [k for k, v in sections.items() if isinstance(v, str) and v.strip()]

    prompt = f"""
    Based on the following resume analysis for the role '{role_match.get('role', 'Unknown')}':{jd_context}
    - Skill coverage: {role_match.get('coverage', 0)}%
    - Matched required skills: {', '.join(role_match.get('required', {}).get('matched', []))}
    - Missing required skills: {', '.join(role_match.get('required', {}).get('missing', []))}
    - Matched nice-to-have skills: {', '.join(role_match.get('nice_to_have', {}).get('matched', []))}
    - Missing nice-to-have skills: {', '.join(role_match.get('nice_to_have', {}).get('missing', []))}
    - Extracted skills: {', '.join(skills.keys())}
    - Resume sections present: {', '.join(sections_list)}

    Provide 3-5 specific, actionable suggestions to improve the resume for this role.
    {"If a Job Description was provided, specifically address how to bridge the gap between this resume and that JD." if jd_context else "Focus on skills, experience, and structure."}
    """

    try:
        response = client.chat.completions.create(
            model=settings.GEMINI_MODEL,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=400,
            temperature=0.7
        )
        raw_content = response.choices[0].message.content
        if not raw_content:
            return "Error: No content received from AI."
        return raw_content.strip()
    except Exception as e:
        return f"Error generating suggestions: {str(e)}"
