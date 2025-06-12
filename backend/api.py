from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.prompt_agent import solve_question_with_agent

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

@router.post("/generate")
async def generate_response(req: PromptRequest):
    try:
        result = solve_question_with_agent(req.prompt)
        print(result)
        return {"result": result["answer"]}
    except Exception as e:
        
        raise HTTPException(status_code=500, detail=str(e))