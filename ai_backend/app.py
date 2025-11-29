# mindecho_api.py
import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

CLIENT = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url=os.getenv("OPENROUTER_URL")
)

app = FastAPI()

# Allow React frontend to call
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str

@app.post("/chat-with-ai")
async def chat_with_mindecho(data: Question):
    try:
        mindEcho_instructions = (
            "You are MindEcho — a friendly mental wellness guide, motivational coach, "
            "and supportive friend. Respond warmly and positively.\n\n"
            f"User: {data.question}"
        )

        mindEcho_response = CLIENT.chat.completions.create(
            model=os.getenv("OPENROUTER_MODEL"),
            messages=[
                {
                    "role": "system",
                    "content": (
                    "You are MindEcho – a gentle wellness guide.\n"
                    "IMPORTANT:\n"
                    "- Always use REAL newline characters '\\n'.\n"
                    "- NEVER write everything in one line.\n"
                    "- Break every point into a new line.\n"
                    "- Use this exact structure:\n\n"
                    "🌼 <Short Title>\n"
                    "\n"
                    "• <Point 1>\n"
                    "• <Point 2>\n"
                    "• <Point 3>\n"
                    "• <Point 4>\n"
                    "\n"
                    "💚 <Short gentle closing message>\n"
                )
                },
                {
                    "role": "user",
                    "content": (
                        f"User message: {data.question}\n\n"
                        "Reply using MANY '\\n' line breaks so the text appears clean in UI."
                    )
                }
            ]
        )

        # Try both access methods to avoid errors
        try:
            response_text = mindEcho_response.choices[0].message["content"]
        except Exception:
            response_text = mindEcho_response.choices[0].message.content

        return {"answer": response_text}

    except Exception as e:
        print("Error in MindEcho API:", e)
        return {"answer": "⚠ Sorry, something went wrong on the AI server."}

