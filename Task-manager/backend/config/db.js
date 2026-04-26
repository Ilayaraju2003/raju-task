const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("DB_URI:", process.env.DB_URI);

const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;