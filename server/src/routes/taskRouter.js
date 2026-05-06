import express from "express"

import {
    getTasks,
    deleteTask,
    createTask,
    updateTask,
    getOverviewTask
} from "../controllers/taskController.js"

const router = express.Router();

router.get("/overview", getOverviewTask)
router.get("/", getTasks)
router.post("/", createTask)
router.delete("/:id", deleteTask)
router.put("/:id", updateTask)

export default router