const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Entrega = sequelize.define('Entrega', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

// Definindo associações com Pedido e Entregador
Entrega.associate = (models) => {
    Entrega.belongsTo(models.Pedido, { foreignKey: 'id_pedido' });
    Entrega.belongsTo(models.Entregador, { foreignKey: 'id_entregador' });
};

module.exports = Entrega;
