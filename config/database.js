const { Sequelize } = require('sequelize');

// Substitua 'database', 'username', 'password' pelos valores corretos
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './database.sqlite', // Para SQLite
    logging: false
});

module.exports = sequelize;