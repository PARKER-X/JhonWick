# utils/mcq.py

from utils.gemini_core import get_gemini_answer

def generate_mcqs_from_text(text):
    prompt = f"""Generate 3 multiple choice questions from the following content.
    Format each as:
    Q: [Question]
    Options:
    - A
    - B
    - C
    - D
    Answer: [Correct Option]

    TEXT:
    {text}"""

    response = get_gemini_answer(prompt)
    questions = []
    for block in response.strip().split("\n\n"):
        if "Q:" in block and "Answer:" in block:
            q = block.split("Q:")[1].split("Options:")[0].strip()
            options_block = block.split("Options:")[1].split("Answer:")[0].strip().split("\n")
            options = [opt.strip("- ").strip() for opt in options_block]
            ans = block.split("Answer:")[1].strip()
            questions.append({"question": q, "options": options, "answer": ans})
    return questions
