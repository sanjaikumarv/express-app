import express, { Request, Response } from "express"
import path from "path"
import userRoutes from "../apis/user/user.routes"

const app = express.Router()

app.get("/hii", (req: Request, res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));

})

app.use("/user", userRoutes)

export default app