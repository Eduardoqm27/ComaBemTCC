const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('comabem', 'root', '&du4rdoQuart27', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Conectado ao banco de dados MySQL com sucesso.'))
    .catch(error => console.error('Erro ao conectar ao banco de dados:', error));

module.exports = sequelize;