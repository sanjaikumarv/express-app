import express from "express"
import { createMessage, getMessages } from "./message.controller"

const app = express.Router()

app.post("/send-message/:id", createMessage)

app.get("/get-messages", getMessages)

export default app