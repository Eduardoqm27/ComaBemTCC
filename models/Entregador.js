const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Entregador = sequelize.define('Entregador', {
    id_entregador: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avaliacao: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// No momento, sem associações extras
Entregador.associate = (models) => {
    // Pode adicionar mais associações aqui conforme necessário
};

module.exports = Entregador;
