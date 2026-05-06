import { useEffect, useState } from "react";
import TaskCard from "../componets/TaskCard";
import { getTasks, createTask, deleteTask, updateTask } from "../api/taskApi";

export default function Tasks() {
    const [filter, setFilter] = useState("all");
    const [isOpen, setIsOpen] = useState(false)
    const [tasks, setTasks] = useState(null);
    const [form, setForm] = useState({
        name: "",
        direction: "",
        percent: 0,
        deadline: "",
        priority: "low",
    });
    const [editingTask, setEditingTask] = useState(null);


    useEffect(() => {
        getTasks().then(setTasks)
    }, [])

    if (!tasks) return <div>Loading...</div>

    const handleEdit = (task) => {
        setEditingTask(task)
    }

    const handleUpdate = async () => {
        const updated = await updateTask(editingTask.id, editingTask)

        setTasks(prev =>
            prev.map(t => t.id === updated.id ? updated : t)
        )

        setEditingTask(null);
    }

    const handleDelete = async (id) => {
        try {
            if (!window.confirm("Delete this task?")) return;

            await deleteTask(id)

            setTasks((prev) => prev.filter((t) => t.id !== id))
        } catch (err) {
            console.error(err)
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "percent"
                    ? Math.min(100, Math.max(0, Number(value)))
                    : value,
        }));
    };

    const handleCreate = async () => {
        try {
            if (
                !form.name.trim() ||
                !form.direction.trim() ||
                form.percent === "" ||
                !form.deadline ||
                !form.priority
            ) {
                alert("Please fill in all fields");
                return;
            }

            if (form.percent < 0 || form.percent > 100) {
                alert("Percent must be between 0 and 100");
                return;
            }

            const newTask = await createTask(form);

            if (newTask.message) {
                alert(newTask.message);
                return;
            }

            setTasks((prev) => [...prev, newTask]);

            setForm({
                name: "",
                direction: "",
                percent: 0,
                deadline: "",
                priority: "low",
            });

            setIsOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const filteredTasks = tasks.filter((t) => {
        if (filter === "completed") return t.percent === 100;
        if (filter === "pending") return t.percent < 100 && t.priority !== "high";
        if (filter === "high") return t.priority === "high";
        return true;
    });

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between">
                <div className="flex gap-4">

                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-xl hover:bg-indigo-400 ${filter === "all"
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-indigo-500"
                            }`}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter("completed")}
                        className={`px-4 py-2 rounded-xl hover:bg-green-400 ${filter === "completed"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-green-500"
                            }`}
                    >
                        Completed
                    </button>

                    <button
                        onClick={() => setFilter("pending")}
                        className={`px-4 py-2 rounded-xl hover:bg-yellow-400 ${filter === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-yellow-500"
                            }`}
                    >
                        Pending
                    </button>

                    <button
                        onClick={() => setFilter("high")}
                        className={`px-4 py-2 rounded-xl hover:bg-red-400 ${filter === "high"
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-red-500"
                            }`}
                    >
                        High Priority
                    </button>
                </div>

                <div>
                    <button onClick={() => setIsOpen(true)} className="px-4 py-2 rounded-xl hover:bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600">Create Task</button>
                    {isOpen && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
                            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg dark:bg-slate-700 ">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold dark:text-white">Create Task</h2>
                                    <button onClick={() => setIsOpen(false)}>✕</button>
                                </div>

                                <form className="flex flex-col gap-4">
                                    <label className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600 dark:text-white">Name</span>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Task name"
                                            className="border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 dark:text-black"
                                            onChange={handleChange}
                                        />
                                    </label>

                                    <label className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600 dark:text-white">Direction</span>
                                        <input
                                            type="text"
                                            name="direction"
                                            placeholder="e.g. Design, Dev, Marketing"
                                            className="border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 dark:text-black"
                                            onChange={handleChange}
                                        />
                                    </label>

                                    <label className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600 dark:text-white">Percent</span>
                                        <input
                                            type="number"
                                            name="percent"
                                            min="0"
                                            max="100"
                                            placeholder="0"
                                            className="border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 dark:text-black"
                                            onChange={handleChange}
                                        />
                                    </label>

                                    <label className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600 dark:text-white">Deadline</span>
                                        <input
                                            type="date"
                                            name="deadline"
                                            className="border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 dark:text-black"
                                            onChange={handleChange}
                                        />
                                    </label>

                                    <label className="flex flex-col gap-1">
                                        <span className="text-sm text-gray-600 dark:text-white">Priority</span>
                                        <select
                                            name="priority"
                                            className="border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 dark:text-gray-400"
                                            onChange={handleChange}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </label>
                                </form>

                                <div className="flex justify-end gap-2 mt-4">
                                    <button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-100 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600">
                                        Cancel
                                    </button>
                                    <button onClick={handleCreate} className="px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-400">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {/* 🔥 TASK LIST */}
            <div className="grid grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                    <TaskCard key={task.id} {...task} onDelete={handleDelete} showMenu={true} onEdit={() => handleEdit(task)} onUpdate={handleUpdate} editingTask={editingTask} setEditingTask={setEditingTask} />
                ))}
            </div>

        </div>
    );
}