import { Request, Response } from "express";
import { User, IUSER, Role, Status, Gender } from "../models/user.model";
import cloudinary from "../config/cloudinary";

import bcrypt from "bcryptjs";

// Get all users with pagination
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ data: user });
    } catch (error) {
        console.error("Error fetching user", error);
        res.status(500).json({ error: "Error fetching user" });
    }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, password, roles, gender, status } = req.body;

        const updateData: Partial<IUSER> = {};

        if (firstname) updateData.firstname = firstname;
        if (lastname) updateData.lastname = lastname;
        if (email) updateData.email = email;
        if (roles) updateData.roles = roles;
        if (gender) updateData.gender = gender;
        if (status) updateData.status = status;
        if (password) updateData.password = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).json({ error: "Error updating user" });
    }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (error) {
        console.error("Error deleting user", error);
        res.status(500).json({ error: "Error deleting user" });
    }
};

export const uploadUserImage = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // This works for single file upload
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "user_profiles",
      width: 500,
      height: 500,
      crop: "fill",
    });

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { imgUrl: result.secure_url },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error uploading user image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};