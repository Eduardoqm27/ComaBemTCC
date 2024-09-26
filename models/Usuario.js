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
});

// Definindo associações
Usuario.associate = (models) => {
    Usuario.hasOne(models.Endereco, {
        foreignKey: 'usuarioId' // Referência à chave estrangeira no modelo Endereco
    });
    Usuario.hasMany(models.Pedido, {
        foreignKey: 'id_usuario'
    });
};

module.exports = Usuario;