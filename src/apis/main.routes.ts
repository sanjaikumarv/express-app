import express, { Request } from "express"
import path from "path"
import userRoutes from "../apis/user/user.routes"

const app = express.Router()

app.get("/hii", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));

})

app.use("/user", userRoutes)

export default app