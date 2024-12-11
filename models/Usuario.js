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
    },
    funcao: {
        type: DataTypes.ENUM('administrador', 'vendedor', 'cliente'),
        allowNull: false,
        defaultValue: 'cliente'
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

// Associação com pedidos (um usuário pode ter vários pedidos)
Usuario.associate = models => {
    Usuario.hasMany(models.Pedido, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
};

module.exports = Usuario;
