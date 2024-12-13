import express from "express"
import myRoutes from "../apis/main.routes"
import "./database"
import morgan from "morgan";
import cors from "cors"
import { ValidationError } from "express-validation";

const app = express()
app.use(express.json())
app.use(morgan("combined"));
app.use(express.static("public"));
app.use(cors());

app.use("/home", myRoutes)

export default app