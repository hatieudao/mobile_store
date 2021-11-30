const { Sequelize } = require('sequelize');

module.exports = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'ec2-54-198-213-75.compute-1.amazonaws.com',
  dialect: 'postgres'
});
