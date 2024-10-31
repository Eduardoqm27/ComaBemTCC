const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    data_nasc: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

Usuario.associate = (models) => {
    Usuario.hasOne(models.Endereco, {
        foreignKey: 'usuarioId',
        as: 'endereco'
    });
    Usuario.hasMany(models.Pedido, {
        foreignKey: 'id_usuario',
        as: 'pedidos'
    });
};

module.exports = Usuario;
