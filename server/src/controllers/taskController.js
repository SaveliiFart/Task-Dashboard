import * as taskModel from "../models/taskModel.js"

const validateTask = ({ name, direction, percent, deadline, priority }) => {
    if (!name?.trim()) return "Name is required";
    if (!direction?.trim()) return "Direction is required";
    if (percent === undefined || percent === "") return "Percent is required";
    if (!deadline) return "Deadline is required";
    if (!priority) return "Priority is required";

    const parsedPercent = Number(percent);

    if (!Number.isFinite(parsedPercent)) {
        return "Percent must be a number";
    }

    if (parsedPercent < 0 || parsedPercent > 100) {
        return "Percent must be between 0 and 100";
    }

    return null;
};

export const getTasks = async (req, res) => {
    const userId = req.user.id
    const tasks = await taskModel.getTasks(userId)
    res.json(tasks)
}

export const createTask = async (req, res) => {
    const userId = req.user.id;
    const body = req.body;

    const error = validateTask(body);

    if (error) {
        return res.status(400).json({ error });
    }

    const task = await taskModel.createTask(userId, {
        ...body,
        percent: Number(body.percent),
    });

    res.json(task);
};

export const deleteTask = async (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    await taskModel.deleteTask(id, userId)
    res.json("Deleted")
}

export const updateTask = async (req, res) => {
    const id = req.params.id
    const userId = req.user.id

    const error = validateTask(req.body)

    if(error) {
        return res.status(400).json({ error })
    }

    const { name, deadline, priority } = req.body
    const percent = Number(req.body?.percent)

    if (!Number.isFinite(percent)) {
        return res.status(400).json({ error: "percent must be a number" })
    }

    const updatedTask = await taskModel.updateTask(id, percent, userId, deadline, name, priority)
    if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" })
    }

    res.json(updatedTask)
}

export const getOverviewTask = async (req, res) => {
    const userId = req.user.id
    const tasks = await taskModel.getTasks(userId)

    const sorted = tasks
        .filter((task) => task.percent < 100)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    res.json({
        urgent: sorted.slice(0, 2),
        today: sorted[0] || null,
        all: tasks
    })
}