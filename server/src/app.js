import express from "express";
import cors from "cors"
import taskRouter from "./routes/taskRouter.js"
import authRouter from "./routes/authRouter.js"
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

app.use(express.json());

app.use(cors())

app.use("/api/auth" , authRouter)
app.use("/api/tasks", authMiddleware , taskRouter)

app.get("/", (req,res) => {
    res.send("API is running...")
})

export default app;