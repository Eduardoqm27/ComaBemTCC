const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Produto = require('./Produto');

const Carrinho = sequelize.define('Carrinho', {
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }
});

Carrinho.belongsTo(Usuario);
Carrinho.belongsTo(Produto);

module.exports = Carrinho;
