const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_produto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    origem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0 },
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true, // A coluna é opcional
    },
    promocao: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    porcentagemPromocao: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: { min: 0, max: 100 },
    },
    destaque: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    preco_desconto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: { min: 0 },
    },
}, {
    tableName: 'produtos',
    timestamps: true,
});

module.exports = Produto;