require('dotenv').config(); // Carrega as variáveis de ambiente
const { Sequelize } = require('sequelize');

// Configuração baseada em variáveis de ambiente
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nome do banco de dados
    process.env.DB_USER, // Usuário do banco de dados
    process.env.DB_PASSWORD, // Senha do banco de dados
    {
        host: process.env.DB_HOST, // Host do banco de dados
        dialect: 'mysql', // Alterar conforme o banco de dados usado ('mysql', 'postgres', 'sqlite', etc.)
        logging: false, // Desative logs, se necessário
    }
);

module.exports = sequelize;
