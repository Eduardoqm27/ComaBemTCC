// Modelo corrigido do Produto
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    id_produto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nome_produto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O nome do produto não pode estar vazio.' },
            len: { args: [3, 255], msg: 'O nome deve ter entre 3 e 255 caracteres.' },
        },
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'A descrição não pode estar vazia.' },
        },
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: { msg: 'A imagem deve ser uma URL válida.' },
        },
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
        validate: {
            min: { args: [0.01], msg: 'O preço deve ser maior que zero.' },
            isDecimal: { msg: 'O preço deve ser um número válido.' },
        },
    },
    categoria: {
        type: DataTypes.ENUM('verdura', 'legumes', 'fruta', 'kits'),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'A categoria não pode estar vazia.' },
        },
    },
    promocao: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    porcentagemPromocao: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: { args: [0], msg: 'A porcentagem de promoção não pode ser negativa.' },
            max: { args: [100], msg: 'A porcentagem de promoção não pode ser maior que 100.' },
        },
    },
    destaque: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    preco_desconto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
            min: { args: [0], msg: 'O preço com desconto deve ser maior ou igual a zero.' },
            isDecimal: { msg: 'O preço com desconto deve ser um número válido.' },
        },
    },
}, {
    tableName: 'tbproduto',
    timestamps: true,
    hooks: {
        beforeSave: (produto) => {
            if (produto.promocao && produto.porcentagemPromocao) {
                produto.preco_desconto = (produto.preco - (produto.preco * produto.porcentagemPromocao / 100)).toFixed(2);
            } else {
                produto.preco_desconto = null;
            }
        },
    },
});

module.exports = Produto;