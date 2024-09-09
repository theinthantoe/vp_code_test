const  Sequelize = require( 'sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: "./utils/dev.sqlite",
  logging: false, 
});

module.exports = sequelize;
