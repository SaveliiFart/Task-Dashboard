import { useState } from "react";
import { register } from "../api/authAPI.js";
import { useNavigate, Navigate, Link } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/overview" />;
    }

    const handleSubmit = async () => {
        const data = await register(form);

        if (!data.message.includes("exists")) {
            navigate("/login");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-80 shadow dark:shadow-black/30 border border-transparent dark:border-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Register
                </h2>

                <input
                    placeholder="Email"
                    className="border border-gray-300 dark:border-gray-700 w-full p-2 mb-3 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-400"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 dark:border-gray-700 w-full p-2 mb-4 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-400"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded"
                >
                    Register
                </button>

                <p className="text-sm text-center mt-4 text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}