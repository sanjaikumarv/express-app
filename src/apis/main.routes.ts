import express, { Request, Response } from "express"
import path from "path"
import userRoutes from "../apis/user/user.routes"

const app = express.Router()



app.use("/user", userRoutes)

export default app