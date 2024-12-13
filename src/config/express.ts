import express from "express"
import myRoutes from "../apis/main.routes"
import "./database"
import morgan from "morgan";
import cors from "cors"
import path from "path";
import nunjucks from "nunjucks"
import cookieParser from "cookie-parser";
const app = express()
app.use(express.json())
app.use(morgan("combined"));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser())
nunjucks.configure(path.resolve(__dirname, "../public"), {
    autoescape: true,
    express: app,
});


app.use("/home", myRoutes)

export default app