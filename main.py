from fastapi import FastAPI, UploadFile, File
from dotenv import load_dotenv
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.gemini import solve_question_with_agent
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Load environment variables from .env
load_dotenv()

app = FastAPI()

# Serve static files like JS and CS
app.mount("/", StaticFiles(directory="frontend", html=True), name="static")




# Allow your frontend to call this backend (adjust origins accordingly)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use your frontend URL(s) in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str
# Serve index.html at root "/"

@app.get("/")
async def read_index():
    return FileResponse("frontend/index.html")

@app.post("/")
async def generate_response(req: PromptRequest):
    try:
        result =  solve_question_with_agent(req.prompt)  # Already returns string
        return {"result": result["answer"]}
    except Exception as e:
        return {"result": f"Error generating response: {str(e)}"}

    
# This block makes it runnable via `python main.py`
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
