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
- [ ] Create `main.py` with FastAPI app
- [ ] Implement file upload endpoint
- [ ] Structure project with `utils/` folder
- [ ] Auto-generate Swagger UI at `/docs`

---

## ✅ PHASE 3: FILE PARSING & TEXT EXTRACTION

### 📌 Checklist
- [ ] Use PyMuPDF to extract text from PDFs
- [ ] Use pytesseract for image OCR
- [ ] Support `.pdf`, `.png`, `.jpg`, `.jpeg`
- [ ] Return cleaned list of questions

---

## ✅ PHASE 4: GEMINI INTEGRATION

### 📌 Checklist
- [ ] Get API key from Google AI Studio
- [ ] Use Gemini Pro for:
  - [ ] Step-by-step question solving
  - [ ] Flashcard generation
  - [ ] Mind map structure (JSON)
  - [ ] MCQ generation

---

## ✅ PHASE 5: OUTPUT GENERATION

### 📌 Checklist
- [ ] Use ReportLab to generate solved PDF
- [ ] Create HTML/CSS flashcards
- [ ] Render mind map via Mermaid.js
- [ ] Bundle all content for user to download

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

ai-edtech-platform/
├── .venv/
├── main.py
├── requirements.txt
├── utils/
│ ├── gemini_api.py
│ ├── extract_text.py
│ └── generate_pdf.py
├── uploads/
├── outputs/
└── roadmap.md