import express from "express";
import path from "path";
import userRoutes from "./user.routes";
import messageRoutes from "./message.routes";
import { authenticateUser } from "../middleware/authenticateUser";
const app = express.Router();

app.get("/health-check", (_, res) => {
  res.json({ message: "Server is running" });
});

app.use("/user", userRoutes);
app.use("/message", authenticateUser(), messageRoutes);

export default app;
