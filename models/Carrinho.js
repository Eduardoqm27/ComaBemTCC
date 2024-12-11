const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carrinho = sequelize.define('Carrinho', {
    id_carrinho: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TbProduto', // A tabela correta é 'TbProduto'
            key: 'id_produto'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Definindo a associação com o modelo Produto
Carrinho.associate = (models) => {
    Carrinho.belongsTo(models.Produto, { foreignKey: 'produtoId' });
};

module.exports = Carrinho;
