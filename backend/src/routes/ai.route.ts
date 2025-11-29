import { Router } from "express"
import {
    chat_with_ai
} from "../controllers/ai.controller"

import { authenticate } from "../middleware/auth"

const router = Router()

//=================USER=================
// chat with AI
router.post("/ai-assistant", chat_with_ai)

export default router