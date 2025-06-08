# utils/mindmap.py

from utils.gemini_core import get_gemini_answer

MINDMAP_PROMPT = """
You are a mind map generator. Based on the following text, extract the key ideas and organize them hierarchically in a mind map format.

Format example:
- Main Topic
  - Subtopic 1
    - Detail A
    - Detail B
  - Subtopic 2
    - Detail C

Text:
\"\"\"{content}\"\"\"
"""

def generate_mindmap_outline(content: str) -> str:
    prompt = MINDMAP_PROMPT.format(content=content)
    response = get_gemini_answer(prompt)
    return response.strip()

# sample_text="Duration (hrs.) Sem. Exam Marks Internal Assessment Marks Total Marks Credits First Year: Semester I Course: MOR101 Linear Programming and Extensions 3 70 30 100 4 Course: MOR102 Inventory Management 3 70 30 100 4 Course: MOR103 Queueing System 3 70 30 100 4 Course: MOR104 Statistics 3 70 30 100 4 Course: MOR105 Python Programming (a) Theory (b) Practical 3 3 50 20 70 30 4 Standing Committee on Academic Matters dated 17.08.2018 Annexure No.-41 7 Duration (hrs.) Sem. Exam Marks Internal Assessment Marks Total Marks Credits First Year: Semester II Course: MOR201 Convex and Discrete Optimization 3 70 30 100 4 Course: MOR202 Scheduling Techniques 3 70 30 100 4 Course: MOR203 Marketing Management 3 70 30 100 4 Course: MOR204 Econometric Modeling and Forecasting 3 70 30 100 4 Course: MOR205: Open Elective: Database Management System and Visual Programming (a) Theory (b) Practical 3 3 50 20 70 30 4 Duration (hrs.) Sem. Exam Marks Internal Assessment Marks Total Marks Credits Second Year: Semester III Course: MOR301 Mathematical Programming 3 70 30 100 4 Course: MOR302 Reliability and Maintenance Theory 3 70 30 100 4 Course: MOR303 Software Engineering 3 70 30 100 4 Course: MOR304 Open Elective (Any one course out of the following): (i) Health Care Management (ii) Revenue Management 3 3 70 70 30 30 100 100 4 4 Course: MOR305 Elective (Any one course out of the following): (i) Supply Chain Management (ii) Financial Management 3 3 70 70 30 30 100 100 4 4 Standing Committee on Academic Matters dated 17.08.2018 Annexure No.-41 8 Duration (hrs.) Sem. Exam Marks Internal Assessment Marks Total Marks Credits Second Year: Semester IV Course: MOR401- 403 Any three Electives out of the following: (i) Marketing Research (ii) Advanced Inventory Management (iii) Queueing Networks (iv) Quality Management (v) Multicriteria Decision Models (vi) Data Warehousing and Data Mining (vii) Decision Theory (viii) Dynamic Optimization (ix) Portfolio Management (x) Stochastic Processes 3 3 3 3 3 3 3 3 3 3 70 70 70 70 70 70 70 70 70 70 30 30 30 30 30 30 30 30 30 30 100 100 100 100 100 100 100 100 100 100 4 4 4 4 4 4 4 4 4 4 Course: MOR404- 405 Project Work: The project work shall be carried out with some industry/company under the supervision of faculty members of the department and the report is to be submitted for evaluation by April 30. It shall carry 200 marks. Project Report Viva-Voce 100 50 50 200 8"

# mindmap = generate_mindmap_outline(sample_text)
# print(mindmap)

def outline_to_mermaid(outline_text: str, root_node: str = "Mind Map") -> str:
    lines = outline_text.strip().split('\n')
    mermaid_lines = ["mindmap", f"  root(({root_node}))"]

    def count_indent(line):
        return len(line) - len(line.lstrip())

    stack = ["root"]
    last_indent = 0

    for line in lines:
        indent = count_indent(line)
        level = indent // 2
        text = line.strip("- ").strip()
        while len(stack) > level + 1:
            stack.pop()
        parent = stack[-1]
        node_id = text.replace(" ", "_").replace("-", "_").lower()
        mermaid_lines.append(f"  {parent} --> {node_id}(({text}))")
        stack.append(node_id)

    return "\n".join(mermaid_lines)



sample_text="Duration (hrs.) Sem. Exam Marks Internal Assessment Marks Total Marks Credits First Year: Semester I Course: MOR101 Linear Programming and Extensions 3 70 30 100 4 Course: MOR102 Inventory Management 3 70 30 100 4 Course: MOR103 Queueing System 3 70 30 100 4 Course: MOR104 Statistics 3 70 30 100 4 Course: MOR105 Python Programming (a) Theory (b) Practical 3 3 50 20 70 30 4 Standing Committee on Academic Matters dated 17.08.2018 Annexure No.-41 7 Duration (hrs.) Sem. Exam Marks Internal Assessment Marks Total Marks Credits First Year: Semester II Course: MOR201 Convex and Discrete Optimization 3 70 30 100 4 Course: MOR202 Scheduling Techniques 3 70 30 100 4 Course: MOR203 Marketing Management 3 70 30 100 4 Course: MOR204 Econometric Modeling and Forecasting 3 70 30 100 4 Course: MOR205: Open Elective: Database Management System and Visual Programming (a) Theory (b) Practical 3 3 50 20 70 30 4 Duration (hrs.) Sem. Exam Marks Internal Assessment Marks Total Marks Credits Second Year: Semester III Course: MOR301 Mathematical Programming 3 70 30 100 4 Course: MOR302 Reliability and Maintenance Theory 3 70 30 100 4 Course: MOR303 Software Engineering 3 70 30 100 4 Course: MOR304 Open Elective (Any one course out of the following): (i) Health Care Management (ii) Revenue Management 3 3 70 70 30 30 100 100 4 4 Course: MOR305 Elective (Any one course out of the following): (i) Supply Chain Management (ii) Financial Management 3 3 70 70 30 30 100 100 4 4 Standing Committee on Academic Matters dated 17.08.2018 Annexure No.-41 8 Duration (hrs.) Sem. Exam Marks Internal Assessment Marks Total Marks Credits Second Year: Semester IV Course: MOR401- 403 Any three Electives out of the following: (i) Marketing Research (ii) Advanced Inventory Management (iii) Queueing Networks (iv) Quality Management (v) Multicriteria Decision Models (vi) Data Warehousing and Data Mining (vii) Decision Theory (viii) Dynamic Optimization (ix) Portfolio Management (x) Stochastic Processes 3 3 3 3 3 3 3 3 3 3 70 70 70 70 70 70 70 70 70 70 30 30 30 30 30 30 30 30 30 30 100 100 100 100 100 100 100 100 100 100 4 4 4 4 4 4 4 4 4 4 Course: MOR404- 405 Project Work: The project work shall be carried out with some industry/company under the supervision of faculty members of the department and the report is to be submitted for evaluation by April 30. It shall carry 200 marks. Project Report Viva-Voce 100 50 50 200 8"

outline = generate_mindmap_outline(sample_text)

# Step 2: Convert outline to Mermaid syntax
mermaid_code = outline_to_mermaid(outline)

# print("🧠 Mermaid Mind Map Code:\n")
# print(mermaid_code)


# utils/mindmap.py


def generate_mindmap_outline(text):
    prompt = f"""Create a mind map outline in Mermaid format based on this text:
    {text}

    Use Mermaid syntax like:
    graph TD
    A[Main Topic] --> B[Subtopic]
    """
    return get_gemini_answer(prompt)
