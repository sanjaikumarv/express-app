import express, { Request, Response } from "express"
import userModel from "../../models/user.model"
import schema from "./user.validation"
import { validate } from "../../middleware/error"
import path from "path"

const app = express.Router()


app.post("/create", validate(schema.createUser), async (req: Request, res: Response) => {
    const user = new userModel()
    user.name = req.body.name
    user.email = req.body.email
    user.phone = req.body.phone

    const createdUser = await user.save()
    res.json(createdUser)
})

app.get("/hii", (req: Request, res) => {
    res.sendFile(path.resolve(__dirname, "../../public/index.html"));
})

export default app