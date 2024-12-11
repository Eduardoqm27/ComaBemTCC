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

// Definindo as associações com Usuario, Entrega e Produto
Pedido.associate = (models) => {
    Pedido.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
    Pedido.hasMany(models.Entrega, { foreignKey: 'id_pedido' });
    Pedido.belongsToMany(models.Produto, {
        through: 'PedidoProduto',
        foreignKey: 'id_pedido'
    });
};

module.exports = Pedido;
