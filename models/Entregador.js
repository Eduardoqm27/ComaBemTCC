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

// Definindo a função associate
Entregador.associate = (models) => {
    // Exemplo de associação: Entregador.hasMany(models.Pedido, { foreignKey: 'id_entregador' });
    // Adicione aqui outras associações conforme necessário
};

module.exports = Entregador;