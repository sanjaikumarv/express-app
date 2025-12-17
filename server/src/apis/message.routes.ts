import express from "express";
import { createMessage, getMessages } from "../controllers/message";

const app = express.Router();

app.post("/send-message/:id", createMessage);

app.get("/get-messages/:id", getMessages);

export default app;
