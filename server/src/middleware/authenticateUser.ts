import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET, REFRESH_SECRET } from "../config/env";
import userModel from "../models/user.model";
import { DecodedUser, ReqUser, User } from "../interface";

export function authenticateUser() {
  return async (req: ReqUser, res: Response, next: NextFunction) => {
    const authToken = req?.headers?.authorization?.split(" ")[1];
    if (!authToken) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    const decodedUser = jwt.verify(authToken, ACCESS_SECRET) as DecodedUser;
    const user: User = await userModel.findOne({ email: decodedUser.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  };
}
