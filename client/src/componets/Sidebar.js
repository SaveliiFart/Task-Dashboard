import { Home, BookOpen, Settings } from "lucide-react"
import { NavLink } from 'react-router-dom';


const Sidebar = () => {

    return (
        <div className="w-72 h-screen bg-gray-100 flex flex-col justify-between p-6 dark:bg-gray-800 ">
            <nav className="flex flex-col gap-4">
                <NavLink className="flex items-center text-indigo-400 gap-3  px-4 py-3 rounder-x1 hover:bg-gray-200 hover:font-medium hover:text-black active:bg-gray-300" to="/overview">
                    <Home size={20} />
                    <span className="font-medium">Overview</span>
                </NavLink>

                <NavLink className="flex items-center gap-3 text-indigo-400 px-4 py-3 hover:bg-gray-200 hover:font-medium hover:text-black active:bg-gray-300" to="/tasks">
                    <BookOpen size={20} />
                    <span>Task</span>
                </NavLink>

                <NavLink className="flex items-center gap-3 text-indigo-400 px-4 py-3 hover:bg-gray-200 hover:font-medium hover:text-black active:bg-gray-300" to="/settings">
                    <Settings size={20} />
                    <span>Settings</span>
                </NavLink>
            </nav>
        </div>
    )
}

export default Sidebar