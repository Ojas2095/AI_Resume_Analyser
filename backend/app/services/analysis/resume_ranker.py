"""
Resume ranking and tier grouping service for the HR bulk screening feature.

Scoring weights:
  - Skill coverage      40%  (matched required skills vs total required)
  - Section completeness 20% (has experience, education, skills, summary)
  - Experience years    20%  (estimated from text patterns like "X years")
  - Education level     10%  (PhD > Masters > Bachelor > any degree)
  - Nice-to-have skills 10%  (bonus for matched optional skills)

Tiers:
  Tier 1 (Top)        >= 75
  Tier 2 (Good)       50-74
  Tier 3 (Borderline) 30-49
  Rejected            < 30
"""
import re


def estimate_experience_years(text: str) -> float:
    """Extract years of experience mentioned in resume text."""
    if not text:
        return 0.0
    patterns = [
        r'(\d+)\+?\s+years?\s+(?:of\s+)?experience',
        r'(\d+)\+?\s+years?\s+(?:in|as|of)',
        r'experience\s+of\s+(\d+)\+?\s+years?',
    ]
    years_found = []
    for pattern in patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        years_found.extend([int(m) for m in matches])
    return max(years_found) if years_found else 0.0


def estimate_education_score(text: str) -> float:
    """Return a 0-1 score based on highest detected education level."""
    if not text:
        return 0.0
    text_lower = text.lower()
    if any(k in text_lower for k in ['phd', 'ph.d', 'doctorate', 'doctor of']):
        return 1.0
    if any(k in text_lower for k in ['master', 'm.s.', 'm.sc', 'mba', 'mtech', 'm.tech']):
        return 0.8
    if any(k in text_lower for k in ['bachelor', 'b.s.', 'b.sc', 'btech', 'b.tech', 'b.e.', 'undergraduate', 'degree']):
        return 0.6
    if any(k in text_lower for k in ['diploma', 'associate', 'certificate', 'certification']):
        return 0.3
    return 0.0


def score_resume(
    matched_skills: list,
    missing_skills: list,
    nice_matched: list,
    nice_missing: list,
    sections: dict,
    full_text: str,
) -> float:
    """
    Compute a 0–100 composite score for a single resume.
    """
    # 1. Skill coverage (40%)
    total_required = len(matched_skills) + len(missing_skills)
    skill_score = (len(matched_skills) / total_required * 100) if total_required > 0 else 0.0
    skill_component = skill_score * 0.40

    # 2. Section completeness (20%)
    key_sections = ['experience', 'education', 'skills', 'summary']
    present = sum(1 for s in key_sections if sections.get(s, '').strip())
    section_component = (present / len(key_sections)) * 100 * 0.20

    # 3. Experience years (20%) — capped at 10 years = full score
    years = estimate_experience_years(full_text)
    exp_component = min(years / 10.0, 1.0) * 100 * 0.20

    # 4. Education level (10%)
    edu_component = estimate_education_score(full_text) * 100 * 0.10

    # 5. Nice-to-have skills (10%)
    total_nice = len(nice_matched) + len(nice_missing)
    nice_score = (len(nice_matched) / total_nice * 100) if total_nice > 0 else 0.0
    nice_component = nice_score * 0.10

    total = skill_component + section_component + exp_component + edu_component + nice_component
    return round(min(total, 100), 1)


def assign_tier(score: float) -> dict:
    """Return tier metadata for a given score."""
    if score >= 75:
        return {'tier': 1, 'label': 'Top Candidates', 'color': 'green'}
    elif score >= 50:
        return {'tier': 2, 'label': 'Good Candidates', 'color': 'yellow'}
    elif score >= 30:
        return {'tier': 3, 'label': 'Borderline', 'color': 'orange'}
    else:
        return {'tier': 4, 'label': 'Not Qualified', 'color': 'red'}


def group_by_tier(candidates: list) -> dict:
    """Group a sorted list of scored candidates into tiers."""
    tiers = {1: [], 2: [], 3: [], 4: []}
    for c in candidates:
        tiers[c['tier']].append(c)
    return {
        'tier1': tiers[1],
        'tier2': tiers[2],
        'tier3': tiers[3],
        'rejected': tiers[4],
    }
