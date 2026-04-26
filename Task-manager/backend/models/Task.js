const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "No description",
    },
    status: {
      type: DataTypes.ENUM("Todo", "In Progress", "Completed"),
      defaultValue: "Todo",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Task;