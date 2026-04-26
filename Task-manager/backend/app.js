const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

// DB connection (Sequelize)
sequelize.sync()
  .then(() => {
    console.log("Database synced successfully");

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Backend is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Database connection failed:", err);
  });


// Serve frontend (production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
  );
}