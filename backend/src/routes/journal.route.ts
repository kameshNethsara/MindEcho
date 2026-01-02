import express from "express"
import {
  createJournal,
  getJournals,
  getJournalById,
  deleteJournal,
  getAllJournalsAdmin,
} from "../controllers/journal.controller"

import { authenticate } from "../middleware/auth"

const router = express.Router();

router.post("/create-journal", authenticate, createJournal)
router.get("/get-journals", authenticate, getJournals)
router.get("/get-selected-journal/:journalId", authenticate, getJournalById)
router.delete("/delete-journal/:journalId", authenticate, deleteJournal)
router.get("/get-all-journals", authenticate, getAllJournalsAdmin);

export default router
