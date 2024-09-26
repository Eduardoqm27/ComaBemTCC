const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');

const Carrinho = sequelize.define('Carrinho', {
    produtoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Produto,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

Carrinho.belongsTo(Produto, { foreignKey: 'produtoId' });

module.exports = Carrinho;
