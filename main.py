# from fastapi import FastAPI, UploadFile, File,HTTPException,APIRouter
# from dotenv import load_dotenv
# import os
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from utils.gemini import solve_question_with_agent
# from fastapi.staticfiles import StaticFiles
# from fastapi.responses import FileResponse

# # Load environment variables from .env
# load_dotenv()

# app = FastAPI()

# # Serve static files like JS and CS
# app.mount("/", StaticFiles(directory="frontend", html=True), name="static")

# router = APIRouter()


# # Allow your frontend to call this backend (adjust origins accordingly)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Use your frontend URL(s) in production!
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class PromptRequest(BaseModel):
#     prompt: str
# # Serve index.html at root "/"

# @app.get("/")
# async def read_index():
#     return FileResponse("frontend/index.html")

# # This block makes it runnable via `python main.py`
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

from fastapi import FastAPI
from backend.api import router  # Import the router
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
app = FastAPI()

# Include the router under the /api path
app.include_router(router, prefix="/api")

app.mount("/", StaticFiles(directory="frontend", html=True), name="static")
@app.get("/")
async def read_index():
    return FileResponse("frontend/index.html")
