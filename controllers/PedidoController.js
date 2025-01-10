const Pedido = require('../models/Pedido'); // Certifique-se de ter o modelo Pedido
const Produto = require('../models/Produto');

module.exports = {
    // Exibir pedidos do cliente
    listarPedidos: async (req, res) => {
        const userId = req.session.userId;

        try {
            const pedidos = await Pedido.findAll({ where: { usuarioId: userId } });
            res.render('pedidos', { pedidos });
        } catch (err) {
            res.status(500).send("Erro ao listar pedidos");
        }
    },

    // Exibir todos os pedidos para vendedores
    listarPedidosVendedor: async (req, res) => {
        if (req.session.tipo !== 'vendedor') {
            return res.status(403).send("Acesso negado");
        }

        try {
            const pedidos = await Pedido.findAll();
            res.render('pedidos-vendedor', { pedidos });
        } catch (err) {
            res.status(500).send("Erro ao listar pedidos");
        }
    },

    // Criar novo pedido
    criarPedido: async (req, res) => {
        const { produtoId, quantidade } = req.body;
        const userId = req.session.userId;

        try {
            const produto = await Produto.findByPk(produtoId);
            if (!produto) {
                return res.status(404).send("Produto não encontrado");
            }

            // Criar pedido
            const pedido = await Pedido.create({
                usuarioId: userId,
                produtoId: produtoId,
                quantidade,
                status: 'pendente' // Status inicial do pedido
            });

            res.redirect('/user/pedidos');
        } catch (err) {
            res.status(500).send("Erro ao criar pedido");
        }
    }
};
