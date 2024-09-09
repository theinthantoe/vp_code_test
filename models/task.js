const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user'); 

const Task = sequelize.define('Task', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

// Define associations
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
