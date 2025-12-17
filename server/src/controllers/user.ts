import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { getJWTExpiry } from "../utils/functions";
import { ACCESS_SECRET, REFRESH_SECRET } from "../config/env";
import { ReqUser } from "../interface";

export async function createUser(req: Request, res: Response) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  const existingUser = await userModel.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(409).json({ message: "User already exist" });
  }
  const user = new userModel();
  user.name = req.body.name;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.password = hash;

  const createdUser = await user.save();
  res.json(createdUser);
}

export async function login(req: Request, res: Response) {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const passCompare = await bcrypt.compare(req.body.password, user.password);

  if (!passCompare) {
    return res.status(400).json({ message: "Password is wrong" });
  }
  const tokenDetail = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  const accessToken = jwt.sign(tokenDetail, ACCESS_SECRET, {
    expiresIn: "1d",
  });
  const newRefreshToken = jwt.sign(tokenDetail, REFRESH_SECRET, {
    expiresIn: "10d",
  });
  const cookieRefreshToken = req.cookies?.refreshToken;
  // if refreshToken already there in cookies
  const filteredRefreshTokens = !cookieRefreshToken
    ? user.refreshTokens
    : user?.refreshTokens?.filter((rt: string) => rt !== cookieRefreshToken);
  user.refreshTokens = filteredRefreshTokens;
  if (cookieRefreshToken) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: false,
      secure: true,
    });
  }
  await user.save();

  res.cookie("refreshToken", newRefreshToken, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 2 Day
    httpOnly: true,
    sameSite: false,
  });

  res.json({
    message: "Login success",
    accessToken: accessToken,
    expiry: getJWTExpiry(accessToken),
  });
}

export async function getUser(req: ReqUser, res: Response) {
  const user = await userModel.find({
    _id: {
      $ne: req.user._id,
    },
  });
  res.json(user);
}

export async function getUserById(req: ReqUser, res: Response) {
  console.log("req.params.id", req.params.id);
  const user = await userModel.findById(req.params.id);
  res.json(user);
}

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const userAuthData = await userModel.findOne({
    refreshTokens: {
      $in: [refreshToken],
    },
  });
  if (!userAuthData) {
    return res.status(404).json({ message: "User not found" });
  }

  let refreshTokens;

  let data;
  try {
    data = await jwt.verify(refreshToken, REFRESH_SECRET);
  } catch (error) {
    return res.status(401).json({ message: "Refresh token expired" });
  }
  if (userAuthData.email !== data.email) {
    return res.status(401).json({ message: "Forbidden" });
  }
  refreshTokens = userAuthData.refreshTokens.filter(
    (rt: string) => rt !== refreshToken
  );
  const tokenData = {
    _id: userAuthData._id,
    name: userAuthData.name,
    email: userAuthData.email,
  };

  const accessToken = await jwt.sign(tokenData, REFRESH_SECRET, {
    expiresIn: "1d",
  });

  const newRefreshToken = await jwt.sign(tokenData, REFRESH_SECRET, {
    expiresIn: "10d",
  });
  userAuthData.refreshTokens = [...refreshTokens, newRefreshToken];

  await userAuthData.save();

  res.cookie("refreshToken", newRefreshToken, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 1 Day
    httpOnly: true,
    sameSite: false,
  });
  return res.json({ accessToken: accessToken });
};

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: false,
      secure: true,
    });
    return res.status(200).json({ message: "User logged out" });
  }
  const refreshToken = cookies.refreshToken;
  const userAuthData = await userModel.findOne({
    refreshTokens: refreshToken,
  });
  if (!userAuthData) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: false,
      secure: true,
    });
    return res.status(200).json({ message: "User logged out" });
  } else {
    userAuthData.refreshTokens = userAuthData.refreshTokens.filter(
      (rt: string) => rt !== refreshToken
    );

    await userAuthData.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: false,
      secure: true,
    });

    return res.status(200).json({ message: "User logged out" });
  }
};
