import { Server } from "socket.io";
import http from "http";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "./env";
import { User } from "../interface";
import express from "express";
import "./database";
import mongoose, { Mongoose } from "mongoose";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const userSocketMap: Record<any, string> = {};

async function checkAuthUser(token: string) {
  let authenticatedUser = false;
  if (!token) {
    return { authenticatedUser, user: null };
  } else {
    const decodedUser = jwt.verify(token, ACCESS_SECRET) as User;
    let user = await userModel.findOne({
      email: decodedUser.email,
    });
    if (!user) {
      return { authenticatedUser, user: null };
    }
    user = await userModel.findByIdAndUpdate(
      user._id,
      { online: true },
      { new: true }
    );
    authenticatedUser = true;
    return { authenticatedUser, user };
  }
}
io.on("connection", async (socket) => {
  const accessToken = socket.handshake.auth?.accessToken; // ✅ FIX
  const { authenticatedUser, user } = await checkAuthUser(accessToken); // ✅ FIX

  if (!authenticatedUser) {
    socket.disconnect(true);
    return;
  }

  userSocketMap[socket.id] = user._id.toString();

  io.to(user._id.toString()).emit("user-status", user);

  socket.on("join", ({ conversation, userId }) => {
    if (conversation) socket.join(conversation);
    if (userId) socket.join(userId);
  });

  socket.on("disconnect", async () => {
    const userId = userSocketMap[socket.id];
    if (userId) {
      const user = await userModel.findByIdAndUpdate(
        userId,
        {
          online: false,
        },
        { new: true }
      );
      io.to(user._id.toString()).emit("user-status", user);
      delete userSocketMap[socket.id];
    }
  });
});

export { io, server, app };
