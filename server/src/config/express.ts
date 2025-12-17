import myRoutes from "../apis/main.routes";
import "./database";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import { app } from "./socket";
import express from "express";
app.use(express.json());
app.use(morgan("combined"));
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
nunjucks.configure(path.resolve(__dirname, "../public"), {
  autoescape: true,
  express: app,
});

app.use("/api/v1", myRoutes);

export default app;
