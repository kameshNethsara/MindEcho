import mongoose, { Schema, Document } from "mongoose";

export interface IJOURNAL extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    moodEmoji: string;       // e.g. "😊"
    text: string;            // user journal entry
    aiSummary: string;       // AI emotional summary
    aiSuggestion: string;    // AI motivational suggestions
    createdAt: Date;
}

const journalSchema = new Schema<IJOURNAL>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    moodEmoji: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    aiSummary: {
        type: String,
        default: "",
    },
    aiSuggestion: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Journal = mongoose.model<IJOURNAL>("Journal", journalSchema);

/**
 * Journal Model Structure
 * 
 * 1. Interface (IJOURNAL)
 *    - Defines TypeScript structure of a journal entry
 *    - Includes: userId, moodEmoji, text, aiSummary, aiSuggestion, createdAt
 * 
 * 2. Mongoose Schema (journalSchema)
 *    - userId: reference to the User collection
 *    - moodEmoji: stores emoji (e.g., "😊")
 *    - text: user’s journal entry
 *    - aiSummary: AI-generated emotional summary (optional)
 *    - aiSuggestion: AI motivational tip (optional)
 *    - createdAt: auto-generated timestamp
 * 
 * 3. Model Export
 *    - Connects schema to "journals" collection in MongoDB
 *    - Used for saving, updating, and fetching journal entries
 */
