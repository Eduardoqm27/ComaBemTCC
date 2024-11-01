const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carrinho = (sequelize) => {
    const CarrinhoModel = sequelize.define('Carrinho', {
        id_carrinho: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        produtoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TbProduto', // A tabela correta é 'Produto'
                key: 'id_produto'
            }
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    CarrinhoModel.associate = (models) => {
        CarrinhoModel.belongsTo(models.Produto, { foreignKey: 'produtoId' });
    };

    return CarrinhoModel;
};

// Mude a exportação para que utilize a função de criação
module.exports = Carrinho(sequelize);
