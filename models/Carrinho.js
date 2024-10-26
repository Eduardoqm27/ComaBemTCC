const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');

const Carrinho = sequelize.define('Carrinho', {
    produtoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Produto,
            key: 'id'
        },
        allowNull: false // Garantindo que o produtoId não seja nulo
    },
    quantidade: { // Adicionando a quantidade
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isInt: true, // Verifica se é um número inteiro
            min: 1 // A quantidade mínima deve ser 1
        }
    }
}, {
    timestamps: false
});

// Estabelecendo a relação de que um carrinho pertence a um produto
Carrinho.belongsTo(Produto, { foreignKey: 'produtoId' });

module.exports = Carrinho;
