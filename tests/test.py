import sys
import os

# Add project root directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi import FastAPI
from pydantic import BaseModel
from utils.prompt_agent import solve_question_with_agent
app = FastAPI()
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


app.mount("/", StaticFiles(directory="frontend", html=True), name="static")

class PromptRequest(BaseModel):
    prompt: str



@app.post("/api/generate")
async def generate_response(req: PromptRequest):
    try:
        result = solve_question_with_agent(req.prompt)
        return {"result": result["answer"]}
    except Exception as e:
        return {"result": f"Error generating response: {str(e)}"}
