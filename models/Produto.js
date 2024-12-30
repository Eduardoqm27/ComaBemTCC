const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const path = require('path');

const Produto = sequelize.define('TbProduto', {
    id_produto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_produto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    origem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    promocao: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    porcentagemPromocao: {
        type: DataTypes.FLOAT, // Porcentagem da promoção (0 a 100)
        allowNull: true,
    },
    categoria: {
        type: DataTypes.ENUM('verdura', 'legumes', 'fruta', 'kits'),
        allowNull: false,
    },
    destaque: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
    tableName: 'Produtos',
});

// Associação com o modelo de Categoria (se existir)
Produto.associate = (models) => {
    Produto.belongsTo(models.Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
};

module.exports = Produto;