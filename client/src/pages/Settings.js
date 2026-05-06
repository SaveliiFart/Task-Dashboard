import useTheme from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";

export default function Settings() {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="max-w-3xl">
            <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Settings
            </h1>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm dark:shadow-black/30 border border-transparent dark:border-gray-800 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-gray-900 dark:text-white">
                            Appearance
                        </h2>
                        <p className="text-sm text-gray-400 dark:text-gray-300">
                            Switch between light and dark theme.
                        </p>
                    </div>

                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                        {theme === "dark" ? "Light" : "Dark"}
                    </button>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                    <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
                        Security
                    </h3>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}