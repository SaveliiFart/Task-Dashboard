import { db } from "../config/db.js";

export const getTasks = async (userId) => {
    return await db.all("SELECT * FROM tasks WHERE userId = ?", [userId])
};

export const createTask = async (userId ,task) => {
    const { name, direction, percent, deadline, priority } = task;

    const result = await db.run(
        "INSERT INTO tasks (userId, name, direction, percent, deadline, priority) VALUES (?, ?, ?, ?, ?, ?)",
        [userId ,name, direction, percent, deadline, priority]
    );

    return { id: result.lastID, name, direction, percent, deadline, priority };
};

// Backwards-compatible alias if other files still import createTasks
export const createTasks = createTask;

export const deleteTask = async (id, userId) => {
    return await db.run("DELETE FROM tasks WHERE id =? AND userId = ?", [id, userId])
};

export const updateTask = async (id, percent, userId,deadline,name,priority) => {
    await db.run("UPDATE tasks SET percent = ?, deadline = ?, name = ?, priority = ? WHERE id = ? AND userId = ?", [percent,deadline,name,priority, id, userId])
    return await db.get("SELECT * FROM tasks WHERE id = ?", [id])
}
