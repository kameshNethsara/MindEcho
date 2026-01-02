// src/routes/user.route.ts
import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserImage
} from "../controllers/user.controller";
import { authenticate } from "../middleware/auth";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({}); // or memoryStorage
export const upload = multer({ storage });

//=================USER=================
// Get all users - authenticated users only (or admin only)
router.get("/get-users", authenticate, getAllUsers);

// Get single user by ID
router.get("/get-user/:id", authenticate, getUserById);

// Update user by ID
router.put("/update-user/:id", authenticate, updateUser);

// Delete user by ID
router.delete("/delete-user/:id", authenticate, deleteUser);

// Upload profile image
router.put("/upload-image/:id", authenticate, upload.single("image"), uploadUserImage);

export default router;
