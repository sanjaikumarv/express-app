import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId, Types } from "mongoose";

export interface DecodedUser extends JwtPayload {
    name: string,
    email: string
}

export interface User {
    user: {
        _id?: Types.ObjectId,
        name: string,
        email: string
    }
}