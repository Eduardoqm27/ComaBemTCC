const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
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
        type: DataTypes.TEXT, // Use TEXT para descrições mais longas
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true, // Opcional caso o upload de imagem não seja obrigatório
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: true, // Nem todos os produtos podem ter marca
    },
    origem: {
        type: DataTypes.STRING,
        allowNull: true, // Opcional
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
    timestamps: true, // Criação e atualização de timestamps automáticos
    tableName: 'Produtos',
});

// Associação com o modelo de Categoria (se existir)
Produto.associate = (models) => {
    Produto.belongsTo(models.Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
};

module.exports = Produto;
