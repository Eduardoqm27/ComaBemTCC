const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ComaBem', 'root', 'aluno01', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;

//MySql IFC -> aluno01
//MySql Casa -> &du4rdoQuart27