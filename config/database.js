const { Sequelize } = require('sequelize');

// Configuração para SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;