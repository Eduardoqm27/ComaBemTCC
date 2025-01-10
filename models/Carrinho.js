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
            model: 'Produtos', 
            key: 'id_produto', 
        },
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'Carrinhos',
});

Carrinho.belongsTo(Produto, { as: 'produto', foreignKey: 'produtoId' });

module.exports = Carrinho;
