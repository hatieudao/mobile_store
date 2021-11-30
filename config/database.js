const { Sequelize } = require('sequelize');

const dbDev = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});
const dbProduct = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: true
  }
})

const db = (process.env.NODE_ENV === 'production' ? dbProduct : dbDev)

console.log(`This app lanch in ${process.env.NODE_ENV} environment`)


module.exports = db
