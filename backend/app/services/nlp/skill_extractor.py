import re
from app.services.nlp.skill_loader import load_skills

def extract_skills(sections: dict) -> dict:
    """
    Extract skills from resume sections.

    sections: dict mapping section name -> str (plain text of that section).
    detect_sections() returns strings, not lists, so we use them directly.
    """
    skills_db = load_skills()
    found = {}

    # sections values are strings (from detect_sections); use them directly
    searchable_text = {
        "skills": sections.get("skills", ""),
        "experience": sections.get("experience", ""),
        "projects": sections.get("projects", "")
    }

    for skill, aliases in skills_db.items():
        pattern = r"\b(" + "|".join(re.escape(a) for a in aliases) + r")\b"
        regex = re.compile(pattern, re.IGNORECASE)

        evidence = []
        for section, text in searchable_text.items():
            if regex.search(text):
                evidence.append(section)

        if evidence:
            found[skill] = {
                "mentions_in": evidence,
                "aliases": aliases
            }

    return found
