# 🧭 AI EdTech Platform - Roadmap

An intelligent, Gemini-powered academic assistant where students upload PYQs (Previous Year Questions) and receive:
- Solved PDFs
- Flashcards
- Mind Maps
- MCQs
- Doubt-solving
- Personalized roadmaps
- Gamified learning experience

---

## ✅ PHASE 1: ENVIRONMENT SETUP

### 📌 Checklist
- [✅] Create project directory
- [✅] Set up `uv` environment
- [✅] Activate virtual environment
- [✅] Install dependencies:
  - `fastapi`, `uvicorn`
  - `google-generativeai`
  - `pytesseract`, `Pillow`
  - `PyMuPDF`, `reportlab`

---

## ✅ PHASE 2: BACKEND FOUNDATION (FastAPI)

### 📌 Checklist
- [✅] Create `main.py` with FastAPI app
- [✅] Implement file upload endpoint
- [✅] Structure project with `utils/` folder
- [✅] Auto-generate Swagger UI at `/docs`

---

## ✅ PHASE 3: GEMINI INTEGRATION (WITH PROMPT AGENT)

### 🧠 Intelligent Agent (Auto Classifier)
- [✅] Create `classify_question(question: str) -> str` function
  - Categories: `numerical`, `theory`, `diagram`, `definition`, `conceptual`
  [✅] fewshotmcq.py
  [✅] fewshotproof.py
│ [✅] fewshotnumerical.py

### 🔮 Prompt Templates (Few-Shot Enabled)
- [✅] Create prompt bank using few-shot format
- [ ] Store in JSON/YAML format or hardcoded dictionary

### 📌 Checklist
- [✅] Get API key from Google AI Studio
- [✅] Use Gemini for:
- [✅] Step-by-step question solving
- [✅] Flashcard generation
- [✅] Mind map structure (JSON)
- [✅] MCQ generation

---

## ✅ PHASE 4: FILE PARSING & TEXT EXTRACTION
📌 Checklist
- [ ] Extract text from PDFs using PyMuPDF
- [ ]Extract text from images using Tesseract
- [ ]Return structured question list

---

## ✅ PHASE 5: OUTPUT GENERATION

### 📌 Checklist
- [ ] Use ReportLab to generate solved PDF
- [ ] Create HTML/CSS flashcards
- [ ] Render mind map via Mermaid.js
- [ ] Bundle all content for user to download
- [ ] Demo folder for streamlit

---

## ✅ PHASE 6: USER DASHBOARD (Optional Phase)

### 📌 Checklist
- [ ] Track number of questions solved
- [ ] Store XP, badges, streaks (SQLite or Firebase)
- [ ] Leaderboard system

---

## ✅ PHASE 7: ROADMAP GENERATION (Advanced)

### 📌 Checklist
- [ ] Analyze weak areas based on question types
- [ ] Generate personalized revision roadmap
- [ ] Recommend topics, extra MCQs, and concepts

---

## ✅ PHASE 8: FRONTEND UI (Optional Phase)

### 📌 Checklist
- [ ] Build with React.js or plain HTML+JS
- [ ] Upload interface
- [ ] Output viewer (PDF, flashcards, mind map)
- [ ] Progress dashboard

---

## 🧩 Project Structure

``` ai-edtech-platform/
├── .venv/
├── main.py
├── requirements.txt
├── utils/
│ ├── gemini.py
│ ├── gemini_core.py
│ ├── demo.py
│ ├── extract_text.py
│ └── prompt_agent.py
│ └── fewshotmcq.py
│ └── fewshotproof.py
│ └── fewshotnumerical.py
│ └── flashcard.py
│ └── mindmap.py
│ └── mcq.py
│ └── chatbot.py
│ └── summary.py
├── demo/
│ ├── mind.py
│ ├── dashboard.py
├── uploads/
├── outputs/
└── roadmap.md ```