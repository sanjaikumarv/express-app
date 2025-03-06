import express, { Request } from "express"
import schema from "./user.validation"
import { validate } from "../../middleware/error"
import { authenticateUser } from "../../middleware/authenticateUser"
import { createUser, getUser, login, logout } from "./user.controller"
const app = express.Router()

app.post("/create", validate(schema.createUser), createUser)

app.post("/login", validate(schema.loginUser), login)

app.get("/", authenticateUser(), getUser)

app.get("/hii", (req: Request, res) => {
    res.render('index.html', { message: 'Hello, dynamic world!' });
})

app.post("/logout", logout)

export default app