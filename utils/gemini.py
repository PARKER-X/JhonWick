
from prompt_agent import solve_question_with_agent



# question = "What is organic chemistry?"
question = "Find solution using Simplex(BigM) method MIN Z = x1 + x2 subject to 2x1 + 4x2 >= 4 x1 + 7x2 >= 7 and x1,x2 >= 0"

result = solve_question_with_agent(question)

print("\n=== Gemini Q&A Result ===")
print(f"Prompt Type: {result['type']}")
print(f"\nPrompt Used:\n{result['prompt_used']}\n")
print(f"Answer:\n{result['answer']}")