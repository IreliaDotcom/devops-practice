import express from "express";
import connectDB from "./config/db";
import todoRoutes from "./routes/todoRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/todos", todoRoutes);

export default app;
