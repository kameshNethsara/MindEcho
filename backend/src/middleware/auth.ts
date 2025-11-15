import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string

// We extend the default Express Request type so we can safely
// attach a `user` object to the request after verifying the JWT token.
// Without this, TypeScript will show an error because `req.user` does not
// exist on the original Request interface.

export interface AuthRequest extends Request {
  // This will store the decoded JWT payload
  // so that controllers and other middleware can access the logged-in user.
  user?: any
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    //token is in the format "Bearer <token>"
    const token = authHeader.split(" ")[1]
    
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        req.user = payload
        next()
    } catch (err) {
        console.error(err)
        res.status(401).json({
        message: "Invalid or expire token"
        })
    }
}

// authenticate → next → controllerFunction
