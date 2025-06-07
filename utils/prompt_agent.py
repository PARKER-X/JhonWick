# prompt_agent.py

from gemini_core import get_gemini_answer  # Adjust path if needed
from fewshotnumerical import FEW_SHOT_NUMERICAL_PROMPT
from fewshotmcq import FEW_SHOT_MCQ_PROMPT
from fewshotproof import FEW_SHOT_PROOF_PROMPT

# Prompt templates for different question types
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
        "template": (
            "Define and explain the following concept in a clear and structured way:\n"
            "{question}\n\n"
            "Include:\n"
            "1. 🔍 Definition\n"
            "2. 📌 Practical Usage or Application\n"
            "3. ✏️ If applicable, give a brief example"
        )
    },
    "default": {
        "style": "zero-shot",
        "template": (
            "Solve the following question step by step:\n"
            "{question}\n\n"
            "At the end, provide:\n"
            "1. ✅ Final Answer\n"
            "2. 🔎 Summary of the solution\n"
            "3. 📘 List of formulas or concepts used"
        )
    }
}

def classify_question(question: str) -> str:
    q_lower = question.lower()
    
    if any(kw in q_lower for kw in ["prove", "show that", "derive","demonstrate","establish"]):
        return "proof"
    elif any(kw in q_lower for kw in ["mcq", "choose", "option", "select", "multiple choice", "correct answer", "which of the following"]):
        return "mcq"
    elif any(kw in q_lower for kw in ["define", "what is", "explain the meaning of"]):
        return "theory"
    elif any(kw in q_lower for kw in [
        "calculate", "equation", "integrate", "differentiate", "integration",  "integral",
        "find solution", "minimize", "maximize", "linear programming", "simplex", "bigm","dy/dx","calculate", "solve", "value", "evaluate", "find", "simplify", "determine", "compute",
        "integrate", "integration", "integral", "differentiate", "derivative", "differentiation",
        "equation", "expression", "minimize", "maximize", "optimization", "gradient", "cost function",
        "prediction", "regression", "mean", "standard deviation", "accuracy", "precision", "recall",
        "height", "angle", "distance", "trigonometry", "tan", "sin", "cos", "transportation problem","probability",
        "simplex", "bigm", "dual", "assignment problem", "knapsack", "graph", "shortest path", "kruskal"
    ]):
        return "numerical"
    else:
        return "default"

def build_prompt(question: str, q_type: str) -> str:
    template_data = PROMPT_TEMPLATES.get(q_type, PROMPT_TEMPLATES["default"])
    return f"{template_data['template']}\n\nQ: {question}\nA:"


def solve_question_with_agent(question: str) -> dict:
    q_type = classify_question(question)
    prompt = build_prompt(question, q_type)
    answer = get_gemini_answer(prompt)
    return {
        "type": q_type,
        "prompt_used": prompt,
        "answer": answer
    }


