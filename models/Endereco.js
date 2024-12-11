const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Endereco = sequelize.define('Endereco', {
    id_endereco: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuarios', // A tabela se chama 'Usuarios'
            key: 'id'
        }
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.CHAR(8),
        allowNull: false
    }
});

// Definindo a associação com o modelo Usuario
Endereco.associate = (models) => {
    Endereco.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
};

module.exports = Endereco;
