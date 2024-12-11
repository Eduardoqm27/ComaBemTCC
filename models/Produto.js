const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
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
    },
    categoria: {
        type: DataTypes.ENUM('verdura', 'legumes', 'fruta', 'kits'),
        allowNull: false
    },
    destaque: {  // Adicionando campo de destaque para promoção
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: 'Produtos' // Ajuste do nome da tabela
});

// Definindo a associação com Carrinho
Produto.associate = (models) => {
    Produto.hasMany(models.Carrinho, { foreignKey: 'produtoId' });
};

module.exports = Produto;
