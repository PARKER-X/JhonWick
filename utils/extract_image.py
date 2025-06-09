from PIL import Image
import pytesseract
import io

# ✅ Correct path to the OCR engine, not the installer
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text_from_image(uploaded_file):
    image = Image.open(uploaded_file)
    text = pytesseract.image_to_string(image)
    return text
