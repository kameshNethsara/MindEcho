import { Router } from "express"
import {
    getMyProfile,
    login,
    register,
    refreshToken
} from "../controllers/auth.controller"
import { authenticate } from "../middleware/auth"

const router = Router()

//=================PUBLIC=================
// register (1st user = ADMIN then others = USERs) - public
router.post('/register', register)
// login - public
router.post('/login', login)
// refresh - public
router.post("/refresh", refreshToken)

//=================ADMIN=================
// register (ADMIN) - can be accessed by Admin only
// router.post('/register/admin')

// me - can be accessed by Admin only
router.get("/me", authenticate, getMyProfile)

export default router