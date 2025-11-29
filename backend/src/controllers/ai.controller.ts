import { Request, Response } from "express";

export const chat_with_ai = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    console.log("Received question:", question);

    const response = await fetch("http://localhost:8000/chat-with-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    console.log("FastAPI status:", response.status);

    const data = await response.json();
    console.log("FastAPI response:", data);

    res.json({ answer: data.answer });
  } catch (err) {
    console.error("Error in chat_with_ai:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
