import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing.")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.0-flash")

def get_gemini_answer(prompt: str) -> str:
    response = model.generate_content(prompt)
    return response.text


    

# print(get_gemini_answer("what is organic chemistry"))
# Use Integration by Parts to find ∫ cos(x)e^x dx