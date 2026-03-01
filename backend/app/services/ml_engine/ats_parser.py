import re

def calculate_ats_structural_score(text: str, sections: dict) -> dict:
    """
    Evaluates the structural integrity of the resume for ATS parsers.
    Checks for essential sections and contact information.
    Returns a score out of 100, and feedback.
    """
    score = 0
    feedback = []
    
    # 1. Check sections (Max 60 points)
    essential_sections = ['experience', 'education', 'skills']
    found_sections = [sec for sec in essential_sections if sections.get(sec, "").strip()]
    
    section_score = (len(found_sections) / len(essential_sections)) * 60
    score += section_score
    
    if len(found_sections) < len(essential_sections):
        missing = set(essential_sections) - set(found_sections)
        feedback.append(f"Missing distinct ATS parsable headers for: {', '.join(missing)}.")
    else:
        feedback.append("Excellent structural formatting. All core sections are cleanly separated.")
        
    # 2. Contact Info Extraction (Max 40 points)
    # Email Regex
    email_regex = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    has_email = bool(re.search(email_regex, text))
    
    # Phone Regex (matches universal patterns like (123) 456-7890, +1 234 567 8901, etc.)
    phone_regex = r"\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}"
    has_phone = bool(re.search(phone_regex, text))
    
    # LinkedIn
    has_linkedin = "linkedin.com" in text.lower()
    
    contact_score = 0
    if has_email: contact_score += 15
    else: feedback.append("Could not parse an email address.")
    
    if has_phone: contact_score += 15
    else: feedback.append("Could not parse a phone number.")
        
    if has_linkedin: contact_score += 10
    else: feedback.append("Could not parse a LinkedIn profile link.")
        
    score += contact_score
    
    return {
        "score": round(score, 2),
        "feedback": feedback,
        "metrics": {
            "has_email": has_email,
            "has_phone": has_phone,
            "has_linkedin": has_linkedin,
            "distinct_sections": len(found_sections)
        }
    }
