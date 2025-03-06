import express from "express"
import path from "path"
import userRoutes from "../apis/user/user.routes"
import messageRoutes from "../apis/message/message.routes"
import { authenticateUser } from "../middleware/authenticateUser"
const app = express.Router()

app.get("/hii", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
})
app.use("/user", userRoutes)
app.use("/message", authenticateUser, messageRoutes)

export default app