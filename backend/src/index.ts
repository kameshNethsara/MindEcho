import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import authRouter from "./routes/auth.route"
import dotenv from "dotenv"
dotenv.config()

console.log("Backend is working...")

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI as string

const app = express()

app.use(express.json())

app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"] // optional 
    })
)

app.use("/api/v1/auth", authRouter)

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error)
    })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

