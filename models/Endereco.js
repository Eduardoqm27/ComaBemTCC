const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Endereco = sequelize.define('Endereco', {
    id_endereco: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuarioId: { // Chave estrangeira para Usuario
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuarios', // Assumindo que a tabela se chama 'Usuarios'
            key: 'id' // Referência ao id do Usuario
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

// Definindo a função associate
Endereco.associate = (models) => {
    Endereco.belongsTo(models.Usuario, { foreignKey: 'usuarioId' }); // Associa Endereco a Usuario
};

module.exports = Endereco;