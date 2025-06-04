from fastapi import FastAPI, UploadFile, File
from utils.gemini import solve_question
from utils.extract_text import extract_text_from_file
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

app = FastAPI()


@app.get("/")
def root():
    return {"status": "API is running!"}


@app.post("/upload/")
async def upload_pyq(file: UploadFile = File(...)):
    contents = await file.read()
    text_questions = extract_text_from_file(contents, file.filename)
    results = []

    for q in text_questions:
        answer = solve_question(q)
        results.append({"question": q, "answer": answer})

    return {"results": results}


# This block makes it runnable via `python main.py`
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
