const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
    id_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    pagto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

Pedido.associate = (models) => {
    Pedido.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario'
    });
    Pedido.hasMany(models.Entrega, { // Adicione esta linha se um Pedido tiver várias Entregas
        foreignKey: 'id_pedido'
    });
};

module.exports = Pedido;
