import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()  # Load from .env file

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing. Please check your .env file.")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.0-flash")

def solve_question(question: str):
    prompt = f"Solve the following exam question step-by-step:\n{question}"
    response = model.generate_content(prompt)
    return response.text
    

print(solve_question("what is organic chemistry"))