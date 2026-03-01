import fitz
def extract_text_from_pdf(file_bytes: bytes)-> str:
    doc=fitz.open(stream=file_bytes,filetype="pdf")
    text=[]

    for page in doc:
        page_text=page.get_text().strip()
        if page_text:
            text.append(page_text)

    return "\n".join(text)