import mongoose, { Schema } from "mongoose";

export enum Role {
    USER = "user",
    ADMIN = "admin",
}

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other",
}

export enum Status {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export interface IUSER extends Document {
    _id: mongoose.Types.ObjectId;
    firstname: string
    lastname: string
    email: string;
    password: string;
    roles: Role[];
    gender?: Gender;
    status: Status;
    createdAt: Date;
    // updatedAt: Date;
}

const userSchema = new Schema<IUSER>({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        required: true,
        default: [Role.USER],
    },
    gender: {
        type: String,
        // required: true,
        default: Gender.OTHER,
    },
    status: {
        type: String,
        required: true,
        default: Status.ACTIVE,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // },
});

export const User = mongoose.model<IUSER>("User", userSchema);

/**
 * User Model Structure
 * 
 * 1. Enums (Role, Gender, Status)
 *    - Role: defines allowed user roles (user, admin)
 *    - Gender: allowed gender values (male, female, other)
 *    - Status: account status values (active, inactive)
 * 
 * 2. TypeScript Interface (IUSER)
 *    - Defines the shape of a User object in TypeScript
 *    - Includes: _id, firstname, lastname, email, password, roles, gender, status
 *    - Provides type safety during development
 * 
 * 3. Mongoose Schema (userSchema)
 *    - Defines how User data is stored in MongoDB
 *    - Fields:
 *        firstname: required
 *        lastname: required
 *        email: required + unique
 *        password: required
 *        roles: array, default = user
 *        gender: default = other
 *        status: default = active
 * 
 * 4. Model Export
 *    - Exports mongoose.model("User", userSchema)
 *    - Used for creating, updating, deleting, and finding users
 *    - Connects schema to the "users" collection in MongoDB
 */
