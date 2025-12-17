import express, { Request } from "express";
import schema from "../validation-schema/user.validation";
import { validate } from "../middleware/error";
import { authenticateUser } from "../middleware/authenticateUser";
import {
  createUser,
  getUser,
  getUserById,
  login,
  logout,
} from "../controllers/user";
const app = express.Router();

app.post("/register", validate(schema.createUser), createUser);

app.post("/login", validate(schema.loginUser), login);

app.get("/", authenticateUser(), getUser);
app.get("/:id", authenticateUser(), getUserById);

app.get("/health-check", (req: Request, res) => {
  res.json({ message: "Server is running" });
});

app.get("/logout", logout);

export default app;
