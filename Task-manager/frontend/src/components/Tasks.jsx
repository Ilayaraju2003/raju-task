import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./utils/Loader";
// eslint-disable-next-line no-unused-vars
import Tooltip from "./utils/Tooltip";

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = {
      url: "/tasks",
      method: "get",
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    };

    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setTasks(data.tasks || []);
      })
      .catch((err) => console.error(err));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = {
      url: `/tasks/${id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    };

    fetchData(config).then(() => fetchTasks());
  };

return (
  <div className="max-w-3xl mx-auto py-6 px-4">
    
    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Your Tasks
        <span className="ml-2 text-sm bg-gray-200 px-2 py-1 rounded">
          {tasks.length}
        </span>
      </h2>

      <Link
        to="/tasks/add"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
      >
        + Add Task
      </Link>
    </div>

    {/* LOADER */}
    {loading ? (
      <Loader />
    ) : tasks.length === 0 ? (
      <div className="text-center text-gray-500 mt-20">
        No tasks yet 🚀
      </div>
    ) : (
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* TOP */}
            <div className="flex items-center">
              <h3 className="font-semibold text-lg text-gray-800">
                {task.title}
              </h3>

              {/* STATUS BADGE */}
              <span
                className={`ml-3 text-xs px-2 py-1 rounded-full ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {task.status}
              </span>

              {/* ACTIONS */}
              <div className="ml-auto flex gap-3 text-sm">
                <Link
                  to={`/tasks/${task.id}`}
                  className="text-green-600 hover:scale-110 transition"
                >
                  ✏️
                </Link>

                <span
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 cursor-pointer hover:scale-110 transition"
                >
                  🗑️
                </span>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-3 text-xs text-gray-400 flex justify-between">
              <span>Task #{index + 1}</span>
              <span>
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleString()
                  : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default Tasks;