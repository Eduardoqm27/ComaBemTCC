const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Produto;