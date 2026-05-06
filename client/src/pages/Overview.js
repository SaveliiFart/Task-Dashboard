import { useEffect, useRef, useState } from "react";
import { Users } from "lucide-react";
import Chart from "chart.js/auto";
import TaskCard from "../componets/TaskCard";
import { getOverview } from "../api/taskApi";
import { getProfile } from "../api/authAPI";
import { Link } from "react-router-dom";

export default function Overview() {
  const [data, setData] = useState(null)
  const [profile, setProfile] = useState(null);
  const canvasRef = useRef(null);
  const today = new Date().toDateString();

  function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function getWeekDays() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(now);
    monday.setDate(now.getDate() + diff);

    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);

      weekDays.push({
        label: day.toLocaleDateString("en-US", { weekday: "short" }),
        date: day,
      });
    }

    return weekDays;
  }

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(console.error);
  }, []);

  useEffect(() => {
    getOverview().then(setData).catch(console.error)
  }, [])

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const tasks = data.all || [];
    const weekDays = getWeekDays();

    const tasksPerDay = weekDays.map((dayObj) => {
      return tasks.filter((task) => {
        const taskDate = parseLocalDate(task.deadline);

        return taskDate.toDateString() === dayObj.date.toDateString();
      }).length;
    });

    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: weekDays.map((d) => d.label),
        datasets: [
          {
            label: "Tasks",
            data: tasksPerDay,
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#6366f1",
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [data]);

  if (!data) return <div>Loading...</div>

  const tasks = data.all
  const urgentTasks = data.urgent || []
  const todayTask = data.today

  return (
    <div className="flex flex-col gap-6 ">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Hi, {profile?.name} 👋
          </h1>
          <p className="text-gray-400">
            Let’s finish your tasks today!
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/profile">
            <Users size={28} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 flex flex-col gap-6">

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow-sm dark:bg-gray-900 dark:text-white">
              <h3 className="font-semibold mb-4">Task Stats</h3>

              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-xl font-bold">{tasks.length}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-xl font-bold text-green-500">
                    {tasks.filter(t => t.percent === 100).length}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-xl font-bold text-red-500">
                    {tasks.filter(t => t.percent < 100).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm dark:bg-gray-900 dark:text-white">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Activity</h3>
                <span className="text-sm text-gray-400">This Week</span>
              </div>

              <canvas ref={canvasRef}></canvas>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm dark:bg-gray-900 dark:text-white">
            <h3 className="font-semibold mb-4">Upcoming Tasks</h3>

            <div className="grid grid-cols-2 gap-6">
              {urgentTasks.map((task, index) => (
                <TaskCard
                  key={index}
                  name={task.name}
                  direction={task.direction}
                  percent={task.percent}
                  deadline={task.deadline}
                />
              ))}
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-6">

          <div className="bg-white p-4 rounded-2xl shadow-sm dark:bg-gray-900 dark:text-white">
            <h3 className="font-semibold mb-2">Calendar</h3>

            <div className="grid grid-cols-7 gap-2 text-center mt-2">
              {getWeekDays().map((dayObj) => {
                const isToday = dayObj.date.toDateString() === today;

                return (
                  <div
                    key={dayObj.date.toDateString()}
                    className={`p-2 rounded-full ${isToday ? "bg-indigo-500 text-white" : "bg-gray-100 dark:bg-slate-800 dark:text-white"}  `}
                  >
                    {dayObj.date.getDate()}
                  </div>
                );
              })}
            </div>

            {todayTask && (
              <div className="bg-white m-4 p-4 rounded-2xl shadow-sm dark:bg-slate-700 dark:text-white">
                <h4 className="font-semibold">Task Today</h4>

                <p className="text-sm text-gray-400 mb-2">
                  {todayTask.name}
                </p>

                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="text-indigo-500">
                    {todayTask.percent}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all"
                    style={{ width: `${todayTask.percent}%` }}
                  ></div>
                </div>

                <p className="text-sm text-gray-400 mt-2">
                  {todayTask.deadline}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}