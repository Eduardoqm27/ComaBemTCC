const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('comabem', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'mysql'
});

const Produto = sequelize.define('Produto', {
  nome_produto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT, // Alterado para TEXT para suportar descrições mais longas
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  origem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
});

module.exports = Produto;