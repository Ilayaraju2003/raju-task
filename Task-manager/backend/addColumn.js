const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
  logging: console.log
});

async function addColumn() {
  try {
    // Check columns in Tasks table
    const [columns] = await sequelize.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'Tasks'");
    console.log('Columns in Tasks table:', columns);
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

addColumn();