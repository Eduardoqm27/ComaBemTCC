// models/Carrinho.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');  

const Carrinho = sequelize.define('Carrinho', {
    id_carrinho: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto, // Referência direta ao modelo Produto
            key: 'id_produto', // Nome correto da chave estrangeira
        },
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Define um valor padrão
    },
}, {
    timestamps: true,
    tableName: 'Carrinhos', // Nome da tabela no banco
});

Carrinho.belongsTo(Produto, { as: 'produto', foreignKey: 'produtoId' });

module.exports = Carrinho;