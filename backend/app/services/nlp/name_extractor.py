"""
Heuristic candidate name extractor.
Looks at the first 5 non-empty lines of resume text and returns
the most likely full name (title-cased, no common resume keywords).
"""
import re

# Words that disqualify a line from being a name
KEYWORD_BLACKLIST = {
    'resume', 'curriculum', 'vitae', 'cv', 'summary', 'objective',
    'experience', 'education', 'skills', 'contact', 'email', 'phone',
    'address', 'linkedin', 'github', 'portfolio', 'http', 'www', '@',
    'engineer', 'developer', 'manager', 'designer', 'analyst', 'scientist',
}


def extract_name(text: str) -> str:
    """
    Attempt to extract the candidate's name from resume text.
    Returns 'Unknown' if no confident name found.
    """
    if not text:
        return 'Unknown'

    lines = [l.strip() for l in text.splitlines() if l.strip()]
    candidates = lines[:6]  # Check top 6 lines

    for line in candidates:
        # Skip lines that are too long (likely headings or sentences)
        if len(line) > 50:
            continue

        # Skip lines containing blacklisted keywords
        lower = line.lower()
        if any(kw in lower for kw in KEYWORD_BLACKLIST):
            continue

        # Skip lines that look like emails, phones, or URLs
        if re.search(r'[@|.com|.org|\d{7,}|http]', lower):
            continue

        # Must look like 2–4 title-cased words
        words = line.split()
        if 2 <= len(words) <= 4 and all(w[0].isupper() for w in words if w.isalpha()):
            return line

    return 'Unknown'
