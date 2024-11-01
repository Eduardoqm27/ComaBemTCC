const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = () => {
    const ProdutoModel = sequelize.define('TbProduto', {
        id_produto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_produto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagem: {
            type: DataTypes.STRING,
            allowNull: false
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false
        },
        origem: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preco: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        promocao: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    // Definindo a função associate
    ProdutoModel.associate = (models) => {
        ProdutoModel.hasMany(models.Carrinho, { foreignKey: 'produtoId' });
        // Adicione outras associações se necessário
    };

    return ProdutoModel;
};

// Exportando o modelo com a instância do sequelize
module.exports = Produto();
