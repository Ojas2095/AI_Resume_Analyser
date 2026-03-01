from app.services.sectioning.section_headers import SECTION_HEADERS
def normalize(text: str)->str:
    return text.lower().strip()
def detect_sections(text: str)-> dict:
    lines=[l.strip() for l in text.split("\n") if l.strip()]
    sections={key: [] for key in SECTION_HEADERS.keys()}
    sections["summary"] = [] # Ensure summary exists
    
    current_section="summary" # Default to summary for initial contact info/header
    for line in lines:
        normalized=normalize(line)

        found_section=None
        for section,headers in SECTION_HEADERS.items():
            for header in headers:
                if normalized==header:
                    found_section=section
                    break
            if found_section:
                break

        if found_section:
            current_section=found_section
            continue
        if current_section:
            sections[current_section].append(line)

    return{
        section: "\n".join(content)
        for section,content in sections.items()
    }
