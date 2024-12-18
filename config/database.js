const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ComaBem', 'root', '&du4rdoQuart27', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

module.exports = sequelize;

//MySql IFC -> aluno01
//MySql Casa -> &du4rdoQuart27