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
    user = await userModel.findByIdAndUpdate(user._id, { online: true });
    authenticatedUser = true;
    return { authenticatedUser, user };
  }
}
io.on("connection", async (socket) => {
  console.log("Socket attempting connection:", socket.id);

  const accessToken = socket.handshake.auth?.accessToken; // ✅ FIX
  const { authenticatedUser, user } = await checkAuthUser(accessToken); // ✅ FIX

  if (!authenticatedUser) {
    console.log("Unauthorized socket:", socket.id);
    socket.disconnect(true);
    return;
  }

  userSocketMap[socket.id] = user._id.toString();
  socket.on("join", ({ conversation, userId }) => {
    if (conversation) socket.join(conversation);
  });
  io.to(userSocketMap[socket.id]).emit("user-status", user);
  socket.on("disconnect", async () => {
    const user = await userModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(userSocketMap[socket.id]),
      {
        online: false,
      }
    );
    console.log("Disconnected:", socket.id);
    delete userSocketMap[socket.id];
    io.to(userSocketMap[socket.id]).emit("user-status", user);
  });
});

export { io, server, app };
