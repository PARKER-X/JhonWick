# utils/chatbot.py

from utils.gemini_core import get_gemini_answer

def chat_with_content(context, question):
    prompt = f"""You are a helpful tutor. Use the provided content to answer the user's question.

    CONTENT:
    {context}

    QUESTION:
    {question}

    ANSWER:"""
    return get_gemini_answer(prompt)
