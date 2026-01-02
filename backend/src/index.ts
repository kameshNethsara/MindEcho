import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route";
import aiRouter from "./routes/ai.route"
import journalRouter from "./routes/journal.route";
import userRouter from "./routes/user.route";
import dotenv from "dotenv";
// fetch is available globally in Node 18+ (no import needed).
// If running Node < 18 and you must use node-fetch, install it and its types:
//   npm install node-fetch
//   npm install -D @types/node-fetch
// then uncomment the following import:
// import fetch from "node-fetch"; // Node < 20, if needed

dotenv.config();
console.log("Backend is working...");

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI as string;

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/api/v1/auth", authRouter);

// MindEcho route
app.use("/api/v1/mindecho", aiRouter);
app.use("/api/v1/journals", journalRouter);
app.use("/api/v1/users", userRouter);

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
