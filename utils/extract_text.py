import fitz  # PyMuPDF
from PIL import Image
import pytesseract
import io


def extract_text_from_file(content: bytes, filename: str):
    if filename.endswith(".pdf"):
        with open("temp.pdf", "wb") as f:
            f.write(content)
        text = ""
        doc = fitz.open("temp.pdf")
        for page in doc:
            text += page.get_text()
        return [line.strip() for line in text.split("\n") if line.strip()]
    elif filename.endswith((".png", ".jpg", ".jpeg")):
        image = Image.open(io.BytesIO(content))
        text = pytesseract.image_to_string(image)
        return [line.strip() for line in text.split("\n") if line.strip()]
    else:
        return ["Unsupported file type."]
