from utils.gemini import get_gemini_answer
from fewshotnumerical import FEW_SHOT_NUMERICAL_PROMPT
from fewshotmcq import FEW_SHOT_MCQ_PROMPT
from fewshotproof import FEW_SHOT_PROOF_PROMPT



# Prompt templates
PROMPT_TEMPLATES = {
    "proof": {
        "style": "few-shot",
        "template": FEW_SHOT_PROOF_PROMPT
    },
    "numerical": {
        "style": "few-shot",
        "template": FEW_SHOT_NUMERICAL_PROMPT
    },
    "mcq": {
        "style": "few-shot",
        "template": FEW_SHOT_MCQ_PROMPT
    },
    "theory": {
        "style": "zero-shot",
        "template": "Write a detailed theoretical explanation for:\n{question}"
    },
    "default": {
        "style": "zero-shot",
        "template": "Answer the following question clearly:\n{question}"
    }
}

def build_prompt(question: str, q_type: str) -> str:
    template_data = PROMPT_TEMPLATES.get(q_type, PROMPT_TEMPLATES["default"])
    return template_data["template"].format(question=question)


def classify_question(question: str) -> str:
    """
    Basic rule-based classifier (you can replace with AI later)
    """
    q_lower = question.lower()
    if any(kw in q_lower for kw in ["calculate", "solve", "value", "equation", "integrate", "differentiate"]):
        return "numerical"
    elif any(kw in q_lower for kw in ["define", "what is", "explain the meaning of"]):
        return "definition"
    elif any(kw in q_lower for kw in ["why", "explain", "describe", "state"]):
        return "theory"
    elif "concept" in q_lower or "principle" in q_lower:
        return "conceptual"
    else:
        return "default"


def build_prompt(question: str, q_type: str) -> str:
    """
    Builds a prompt using few-shot or zero-shot template
    """
    template_data = PROMPT_TEMPLATES.get(q_type, PROMPT_TEMPLATES["default"])
    return template_data["template"].format(question=question)


def solve_question_with_agent(question: str) -> dict:
    """
    Main entry point: classify, build prompt, get Gemini answer
    Returns: dict with type, prompt, and answer
    """
    q_type = classify_question(question)
    prompt = build_prompt(question, q_type)
    answer = get_gemini_answer(prompt)

    return {
        "type": q_type,
        "prompt_used": prompt,
        "answer": answer
    }
