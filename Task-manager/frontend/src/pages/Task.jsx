import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/utils/Loader";
import useFetch from "../hooks/useFetch";
import MainLayout from "../layouts/MainLayout";

const Task = () => {
  const { token } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId ? "update" : "add";

  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "", // ✅ added
    status: "Todo",
  });

  const [formErrors, setFormErrors] = useState({});

  // 🧠 Page title
  useEffect(() => {
    document.title = mode === "add" ? "Add Task" : "Update Task";
  }, [mode]);

  // 🔄 Fetch task
  useEffect(() => {
    if (mode === "update" && token && taskId) {
      const config = {
        url: `/tasks/${taskId}`,
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      };

      fetchData(config, { showSuccessToast: false })
        .then((data) => {
          if (data?.task) {
            setTask(data.task);
            setFormData({
              title: data.task.title || "",
              description: data.task.description || "", // ✅ added
              status: data.task.status || "Todo",
            });
          }
        })
        .catch((err) => {
          console.error(
            "Fetch Task Error:",
            err?.response?.data || err.message
          );
        });
    }
  }, [mode, token, taskId, fetchData]);

  // ✏️ Handle input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔄 Reset
  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      title: task?.title || "",
      description: task?.description || "", // ✅ added
      status: task?.status || "Todo",
    });
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({});

    if (!formData.title) {
      setFormErrors({ title: "Title is required" });
      return;
    }

    try {
      const config = {
        url: mode === "add" ? "/tasks" : `/tasks/${taskId}`,
        method: mode === "add" ? "post" : "put",
        data: formData, // ✅ now includes description
        headers: { Authorization: `Bearer ${token}` },
      };

      await fetchData(config);
      navigate("/");
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit} // ✅ better than button onClick
        className="m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-center mb-4">
              {mode === "add" ? "Add New Task" : "Edit Task"}
            </h2>

            {/* TITLE */}
            <div className="mb-4">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border p-2 w-full"
                placeholder="Enter task title"
              />
              {formErrors.title && (
                <p className="text-red-500 text-sm">
                  {formErrors.title}
                </p>
              )}
            </div>

          

            {/* STATUS */}
            <div className="mb-4">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 w-full"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* BUTTONS */}
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2"
            >
              {mode === "add" ? "Add Task" : "Update Task"}
            </button>

            <button
              type="button"
              className="ml-4 bg-red-500 text-white px-4 py-2"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            {mode === "update" && (
              <button
                type="button"
                className="ml-4 bg-blue-500 text-white px-4 py-2"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </>
        )}
      </form>
    </MainLayout>
  );
};

export default Task;