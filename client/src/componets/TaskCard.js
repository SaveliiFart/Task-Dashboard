import { EllipsisVertical } from "lucide-react"
import { useEffect, useRef, useState } from "react";

export default function TaskCard({ id, name, direction, priority, percent, deadline, onDelete, showMenu = false, onEdit, onUpdate, editingTask, setEditingTask }) {
    const [Open, setOpen] = useState(false);

    const menuRef = useRef()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!menuRef.current?.contains(e.target)) {
                setOpen(false)
            }
        };

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, []);

    const priorityColor =
        priority === "high"
            ? "text-red-500"
            : priority === "medium"
                ? "text-yellow-500"
                : "text-green-500";

    return (
        <div className="relative bg-white p-4 rounded-2xl shadow-sm dark:bg-slate-700 dark:border-gray-800 dark:shadow-md dark:border">
            <div className="flex justify-between" ref={menuRef}>
                <h4 className="font-semibold dark:text-white">{name}</h4>
                {
                    showMenu && (
                        <button onClick={() => setOpen(true)} ><EllipsisVertical size={20} /></button>
                    )
                }
                {
                    Open && (
                        <div className="absolute right-3 top-10 w-20 bg-white border rounded-xl shadow-lg z-50 dark:bg-slate-700 ">
                            <button onClick={() => {
                                onEdit()
                                setOpen(false)
                            }} className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 dark:rounded-xl">Edit</button>
                            <button onClick={() => onDelete(id)} className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 dark:rounded-xl">Delete</button>
                        </div>
                    )
                }
            </div>

            {editingTask && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-96 dark:bg-slate-700 dark:text-white">

                        <input
                            value={editingTask.name}
                            onChange={(e) =>
                                setEditingTask({
                                    ...editingTask,
                                    name: e.target.value
                                })
                            }
                            className="border p-2 w-full mb-3 dark:text-black"
                        />

                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={editingTask.percent}
                            onChange={(e) =>
                                setEditingTask({
                                    ...editingTask,
                                    percent: Math.min(100, Math.max(0, Number(e.target.value)))
                                })
                            }
                        className="border p-2 w-full mb-3 dark:text-black"
                        />

                        <input
                            type="date"
                            value={editingTask.deadline}
                            onChange={(e) =>
                                setEditingTask({
                                    ...editingTask,
                                    deadline: e.target.value
                                })
                            }
                            className="border p-2 w-full mb-3 dark:text-black"
                        />

                        <select
                            name="priority"
                            className="border p-2 w-full mb-3 dark:text-black"
                            onChange={(e) =>
                                setEditingTask({
                                    ...editingTask,
                                    priority: e.target.value
                                })
                            }
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setEditingTask(null)}>
                                Cancel
                            </button>

                            <button onClick={onUpdate}>
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}

            <p className="text-sm text-gray-400 dark:text-white">{direction}</p>

            <p className={`text-sm mt-2 ${priorityColor}`}>
                {priority} priority
            </p>

            <div className="flex justify-between text-sm mt-2">
                <span className="dark:text-white">Progress</span>
                <span className="dark:text-white">{percent}%</span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                    className="bg-indigo-500 h-2 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>

            <p className="text-sm text-gray-400 mt-2">
                {deadline}
            </p>
        </div>
    );
}