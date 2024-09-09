// models/Produto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Produto = sequelize.define('Produto', {
    nome_produto: {
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
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false 
});

module.exports = Produto;