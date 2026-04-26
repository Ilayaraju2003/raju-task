const { Task } = require("../models");


// 🔹 Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]], // optional: newest first
    });

    res.status(200).json({
      tasks,
      status: true,
      msg: "Tasks fetched successfully",
    });

  } catch (err) {
    console.error("GET TASKS ERROR:", err);
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });
  }
};



// 🔹 Get single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.taskId,
        UserId: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({
        status: false,
        msg: "Task not found",
      });
    }

    res.status(200).json({
      task,
      status: true,
      msg: "Task fetched successfully",
    });

  } catch (err) {
    console.error("GET TASK ERROR:", err);
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });
  }
};



// 🔹 Create task
exports.postTask = async (req, res) => {
  try {
    const { title, description, status } = req.body; // ✅ FIX

    if (!title) {
      return res.status(400).json({
        status: false,
        msg: "Task title is required",
      });
    }

    const task = await Task.create({
      title,
      description, // ✅ ADD THIS
      status,
      UserId: req.user.id,
    });

    res.status(201).json({
      task,
      status: true,
      msg: "Task created successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });
  }
};


// 🔹 Update task
exports.putTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findByPk(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        status: false,
        msg: "Task not found",
      });
    }

    // ✅ Ownership check
    if (task.UserId !== req.user.id) {
      return res.status(403).json({
        status: false,
        msg: "Unauthorized",
      });
    }

    await task.update({
      title: title ?? task.title,
      description: description ?? task.description,
      status: status ?? task.status,
    });

    res.status(200).json({
      task,
      status: true,
      msg: "Task updated successfully",
    });

  } catch (err) {
    console.error("UPDATE TASK ERROR:", err);
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });
  }
};



// 🔹 Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        status: false,
        msg: "Task not found",
      });
    }

    // ✅ Ownership check
    if (task.UserId !== req.user.id) {
      return res.status(403).json({
        status: false,
        msg: "Unauthorized",
      });
    }

    await task.destroy();

    res.status(200).json({
      status: true,
      msg: "Task deleted successfully",
    });

  } catch (err) {
    console.error("DELETE TASK ERROR:", err);
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });
  }
};