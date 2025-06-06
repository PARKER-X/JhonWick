import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()  # Load from .env file

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.0-flash")
response = model.generate_content("Use Integration by Parts to find ∫ cos(x)exdx")
print(response.text)
