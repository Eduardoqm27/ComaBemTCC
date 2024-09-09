const { Sequelize } = require('sequelize');

// Criação de uma instância do Sequelize
const sequelize = new Sequelize('comabem', 'root', '&du4rdoQuart27', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;

// Senha no IF -> aluno01
// Senha meu PC -> &du4rdoQuart27