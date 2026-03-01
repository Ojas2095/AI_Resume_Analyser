from reportlab.lib.pagesizes import LETTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.colors import HexColor
import io

def generate_resume_pdf(resume_text: str, role: str, score: dict) -> bytes:
    """
    Generate a formatted PDF based on the resume text and analysis results.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=LETTER, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    
    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=HexColor("#1A202C"),
        alignment=TA_CENTER,
        spaceAfter=12
    )
    
    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=HexColor("#4A5568"),
        alignment=TA_CENTER,
        spaceAfter=20
    )
    
    heading_style = ParagraphStyle(
        'HeadingStyle',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=HexColor("#2D3748"),
        spaceBefore=12,
        spaceAfter=6,
        borderPadding=(0, 0, 2, 0),
        borderWidth=0,
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=HexColor("#4A5568"),
        leading=14,
        alignment=TA_LEFT,
        spaceAfter=10
    )

    content = []
    
    # Header
    content.append(Paragraph("PROFESSIONAL RESUME", title_style))
    content.append(Paragraph(f"Optimized for {role} | Authority Score: {score.get('total_score', 0)}%", subtitle_style))
    content.append(HRFlowable(width="100%", thickness=1, color=HexColor("#E2E8F0"), spaceBefore=0, spaceAfter=20))
    
    # Body Content (Parsing the cleaned text into paragraphs)
    # In a real app, we would use the 'sections' detector to format this perfectly.
    # For now, we'll format the cleaned text with basic paragraph detection.
    
    paragraphs = resume_text.split('\n\n')
    for p in paragraphs:
        if len(p.strip()) < 50 and p.isupper(): # Likely a section heading
             content.append(Paragraph(p.strip(), heading_style))
             content.append(HRFlowable(width="100%", thickness=0.5, color=HexColor("#CBD5E0"), spaceBefore=2, spaceAfter=6))
        else:
             # Handle bullet points
             lines = p.strip().split('\n')
             for line in lines:
                 if line.strip().startswith('•') or line.strip().startswith('-') or line.strip().startswith('*'):
                     text = line.strip().lstrip('•-*').strip()
                     content.append(Paragraph(f"&bull; {text}", body_style))
                 else:
                     content.append(Paragraph(line.strip(), body_style))
        content.append(Spacer(1, 10))

    doc.build(content)
    pdf_bytes = buffer.getvalue()
    buffer.close()
    return pdf_bytes
