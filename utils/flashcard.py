# utils/flashcard.py

from utils.gemini_core import get_gemini_answer  

FLASHCARD_PROMPT = """
You are a flashcard generator. From the text below, extract key facts and concepts, and generate flashcards in the following format:

Q: [question]
A: [answer]

Rules:
- Only generate relevant flashcards.
- Keep each Q&A short and informative.
- Do not include introductory text.

Text:
\"\"\"{content}\"\"\"
"""

def generate_flashcards_from_text(content: str) -> str:
    prompt = FLASHCARD_PROMPT.format(content=content)
    response = get_gemini_answer(prompt)
    return response


sample_text = """
The water cycle describes how water evaporates from the surface of the earth, rises into the atmosphere, cools and condenses into rain or snow in clouds, and falls again to the surface as precipitation.
"""

flashcards = generate_flashcards_from_text(sample_text)
# print(flashcards)


def generate_flashcards_from_text(text):
    prompt = f"""Create 5 flashcards from the following text. Format each as:
    Q: [Question]
    A: [Answer]

    TEXT:
    {text}"""
    response = get_gemini_answer(prompt)
    cards = []
    for block in response.strip().split("\n\n"):
        if "Q:" in block and "A:" in block:
            q = block.split("Q:")[1].split("A:")[0].strip()
            a = block.split("A:")[1].strip()
            cards.append({"question": q, "answer": a})
    return cards