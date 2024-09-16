const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carrinho = sequelize.define('Carrinho', {
  produtoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Produtos',
      key: 'id'
    }
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Carrinho;