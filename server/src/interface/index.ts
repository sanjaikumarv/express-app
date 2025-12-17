import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId, Types } from "mongoose";

export interface DecodedUser extends JwtPayload {
  name: string;
  email: string;
}

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
}

export interface ReqUser extends Request {
  user: User;
  headers: {
    authorization: string;
  };
}
