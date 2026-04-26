const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  joiningTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

}, {
  timestamps: true,

  // 🔥 Bonus: Hide password automatically
  defaultScope: {
    attributes: { exclude: ["password"] },
  },
});

module.exports = User;