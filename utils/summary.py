# utils/summary.py

from utils.gemini_core import get_gemini_answer

def generate_summary(text):
    prompt = f"Summarize the following content clearly and concisely:\n\n{text}"
    return get_gemini_answer(prompt)
