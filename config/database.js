const { Sequelize } = require('sequelize')

module.exports = new Sequelize('codegig', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    idle: 30000,
    acquire: 10000,
  },
})
