import { IUSER } from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const signAccessToken = (user: IUSER): string => { 
    console.log("AccessToken test 1-------------------")
    return jwt.sign(
        {
            sub: user._id.toString(),
            roles: user.roles
        },JWT_SECRET,{
            expiresIn: "3d" //3d
        }
    )
}

export const signRefreshToken = (user: IUSER): string => {
    console.log("Refreshtoken test 1-------------------")
    return jwt.sign(
        {
            sub: user._id.toString(),
            roles: user.roles
        },JWT_REFRESH_SECRET,{
            expiresIn: "7d" 
        }
    )
}