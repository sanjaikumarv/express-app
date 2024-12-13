import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env";
import userModel from "../models/user.model";
import { DecodedUser, User } from "../interface";


export function authenticateUser() {
    return async (req: any, res: Response, next: NextFunction) => {
        const authToken = req?.cookies?.authToken
        console.log("req cookie",req.cookies)
        if (!authToken) {
            return res.status(401).json({ message: "Unauthorised User" })
        }
        const decodedUser = jwt.verify<DecodedUser>(authToken, jwtSecret)
        const user = await userModel.findOne({ email: decodedUser.email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        req.user = user
        next()
    }
}
