import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth"
import { IUSER, Role, Gender, Status, User } from "../models/user.model"
import bcrypt from "bcryptjs"
import { signAccessToken, signRefreshToken } from "../utils/tokens";
import jwt from "jsonwebtoken"
export const register = async(req: Request, res: Response) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            // roles,
            // gender,
            // status,
        } = req.body
        
        // Validate required fields
        // Ensures the client sends all necessary data
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        // Check if email already exists in the database
        // Prevents duplicate accounts
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" })
        }

        // Count how many users already exist in system
        const usersCount = await User.countDocuments();

        // If first user → ADMIN
        const assignedRoles = usersCount === 0 ? [Role.ADMIN] : [Role.USER];

        // Hash the password for security
        // Never save raw/plain passwords in the database
        const hash = await bcrypt.hashSync(password, 10)

        // Create new user object
        // This prepares the user document with default roles/status values
        // Save the new user to the database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hash,
            roles: assignedRoles,
            gender: Gender.OTHER,
            status: Status.ACTIVE,
            imgUrl: "",
            createAt: new Date()
        })

        // Send success response
        res.status(201).json({
            message: "User registered successfully",
            data: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                roles: user.roles,
                gender: user.gender,
                status: user.status,
                imgUrl: user.imgUrl,
                createdAt: user.createdAt
            }
        })
    } catch (error) {
        console.error("Error registering user",error)
        // Send error response
        res.status(500).json({
            error: "Error registering user"
        })
    }
}

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string

export const login = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password,
        } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const existingUser = await User.findOne({ email }) as IUSER | null;
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" })
        }

        const valid = await bcrypt.compare(password, existingUser.password)
            if (!valid) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const accessToken = signAccessToken(existingUser);
        const refreshToken = signRefreshToken(existingUser);
        
        res.status(200).json({
            message: "User logged in successfully",
            data: {
                _id: existingUser._id,
                firstname: existingUser.firstname,
                lastname: existingUser.lastname,
                email: existingUser.email,
                roles: existingUser.roles,
                gender: existingUser.gender,
                status: existingUser.status,
                accessToken,
                refreshToken,
            }
        })
    } catch (error) {
        console.error("Error logging in user", error)
        res.status(500).json({
            error: "Error logging in user"
        })
    }
}

// export const registerAdmin = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body

//     const existingUser = await User.findOne({ email })
//     if (existingUser) {
//       return res.status(400).json({ message: "Email exists" })
//     }

//     const hash = await bcrypt.hash(password, 10)

//     const user = await User.create({
//       email,
//       password: hash,
//       roles: [Role.ADMIN]
//     })

//     res.status(201).json({
//       message: "Admin registed",
//       data: { email: user.email, roles: user.roles }
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({
//       message: "Internal server error"
//     })
//   }
// }

export const getMyProfile = async (req: AuthRequest, res: Response) => {
    try {
        // Check if the request has a user object.
        // If no user is attached, the token was not provided or invalid.
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        // Find the logged-in user in the database using the ID from the JWT payload (sub)
        // We also remove the password field for security.
        const user = await User.findById(req.user.sub).select("-password")

        // If the user does not exist in the DB, return a 404 response
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // Destructure needed fields from the user object
        const { _id, firstname, lastname, email, roles, gender, status } = user as IUSER

        // Successfully return the user profile data
        res.status(200).json({
            message: "User profile retrieved successfully",
            data: {
                id: _id,
                firstname,
                lastname,
                email,
                roles,
                gender,
                status,
                imgUrl: user.imgUrl,
                createdAt: user.createdAt
            }
        })
    } catch (error) {
        console.error("Error retrieving user profile", error)

        // Handle unexpected server errors
        res.status(500).json({
            error: "Error retrieving user profile"
        })
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.body
        if (!token) {
            return res.status(400).json({ message: "Token required" })
        }

        const payload: any = jwt.verify(token, JWT_REFRESH_SECRET)
        const user = await User.findById(payload.sub)
        if (!user) {
            return res.status(403).json({ message: "Invalid refresh token" })
        }
        const accessToken = signAccessToken(user)

        res.status(200).json({
            accessToken
        })
    } catch (err) {
        res.status(403).json({ message: "Invalid or expire token" })
    }  
}