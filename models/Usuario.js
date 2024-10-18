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
    data_nasc: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true, // Habilita o gerenciamento automático de createdAt e updatedAt
    createdAt: 'createdAt', // Nome da coluna de criação
    updatedAt: 'updatedAt'  // Nome da coluna de atualização
});

// Definindo associações
Usuario.associate = (models) => {
    Usuario.hasOne(models.Endereco, {
        foreignKey: 'usuarioId', // Referência à chave estrangeira no modelo Endereco
        as: 'endereco' // Nome da associação para facilitar a referência
    });
    Usuario.hasMany(models.Pedido, {
        foreignKey: 'id_usuario',
        as: 'pedidos' // Nome da associação para facilitar a referência
    });
};

module.exports = Usuario;
