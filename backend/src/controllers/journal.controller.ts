import { Request, Response } from "express";
import { Journal } from "../models/journal.model";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware/auth";

// ===============================
// Create New Journal Entry
// ===============================
export const createJournal = async (req: AuthRequest, res: Response) => {
    try {
        const { moodEmoji, text } = req.body;

        // Extract user ID from JWT payload
        const userId = req.user?.sub;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. User not found.",
            });
        }

        if (!moodEmoji || !text) {
            return res.status(400).json({
                success: false,
                message: "moodEmoji and text are required.",
            });
        }

        const newJournal = await Journal.create({
            userId,
            moodEmoji,
            text,
            aiSummary: "",
            aiSuggestion: "",
        });

        return res.status(201).json({
            success: true,
            message: "Journal entry created successfully.",
            data: newJournal,
        });
    } catch (error) {
        console.error("Error creating journal:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while creating journal.",
        });
    }
};

// ===============================
// Get All Journals of Logged-in User
// ===============================
export const getJournals = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.sub;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. User not found.",
            });
        }

        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const skip = (page - 1) * limit;
        const total = await Journal.countDocuments({ userId });

        const journals = await Journal.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            data: journals,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit,
            },
        });
    } catch (error) {
        console.error("Error fetching journals:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching journals.",
        });
    }
};

// ===============================
// Get Single Journal by ID
// ===============================
export const getJournalById = async (req: AuthRequest, res: Response) => {
    try {
        const { journalId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(journalId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid journalId.",
            });
        }

        const journal = await Journal.findById(journalId);

        if (!journal) {
            return res.status(404).json({
                success: false,
                message: "Journal entry not found.",
            });
        }

        // Ownership check
        if (journal.userId.toString() !== req.user?.sub) {
            return res.status(403).json({
                success: false,
                message: "Forbidden. You cannot access this journal.",
            });
        }

        return res.status(200).json({
            success: true,
            data: journal,
        });
    } catch (error) {
        console.error("Error fetching journal:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching journal.",
        });
    }
};

// ===============================
// Delete Journal
// ===============================
export const deleteJournal = async (req: AuthRequest, res: Response) => {
    try {
        const { journalId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(journalId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid journalId.",
            });
        }

        const journal = await Journal.findById(journalId);

        if (!journal) {
            return res.status(404).json({
                success: false,
                message: "Journal entry not found.",
            });
        }

        // Ownership check
        if (journal.userId.toString() !== req.user?.sub) {
            return res.status(403).json({
                success: false,
                message: "Forbidden. You cannot delete this journal.",
            });
        }

        await journal.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Journal entry deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting journal:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting journal.",
        });
    }
};
