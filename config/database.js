const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ComaBem', 'root', '&du4rdoQuart27', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;