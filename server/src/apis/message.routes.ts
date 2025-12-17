import express from "express";
import {
  createMessage,
  getConversations,
  getMessages,
} from "../controllers/message";

const app = express.Router();

app.post("/send-message/:id", createMessage);

app.get("/get-messages/:id", getMessages);

app.get("/get-conversations", getConversations);

export default app;
