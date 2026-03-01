def calculate_score(role_match: dict, sections: dict) -> dict:
    """
    Calculate an overall score for the resume based on role match and section completeness.

    Args:
        role_match (dict): The role matching result from match_role.
        sections (dict): Detected sections from the resume.

    Returns:
        dict: Score details including total score, breakdown, and explanation.
    """
    coverage = role_match["coverage"]
    required_matched = len(role_match["required"]["matched"])
    required_total = len(role_match["required"]["matched"]) + len(role_match["required"]["missing"])
    nice_matched = len(role_match["nice_to_have"]["matched"])

    # Weights: 70% skill coverage, 20% section completeness, 10% nice-to-have
    skill_score = coverage * 0.7

    # Section completeness: Check if key sections are present (skills, experience, education)
    key_sections = ["skills", "experience", "education"]
    completeness = sum(1 for sec in key_sections if sections.get(sec, "").strip()) / len(key_sections) * 100
    completeness_score = completeness * 0.2

    nice_score = (nice_matched / max(1, len(role_match["nice_to_have"]["matched"]) + len(role_match["nice_to_have"]["missing"]))) * 100 * 0.1

    total_score = round(skill_score + completeness_score + nice_score, 2)

    return {
        "total_score": total_score,
        "breakdown": {
            "skill_coverage": round(skill_score, 2),
            "section_completeness": round(completeness_score, 2),
            "nice_to_have": round(nice_score, 2)
        },
        "explanation": f"Score based on {coverage}% skill match, {completeness}% section completeness, and nice-to-have skills."
    }