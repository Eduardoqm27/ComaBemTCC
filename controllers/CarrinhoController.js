const Carrinho = require('../models/Carrinho');
const Produto = require('../models/Produto');

const CarrinhoController = {
    // Método para adicionar um produto ao carrinho
    async addToCarrinho(req, res) {
        try {
            const { produtoId, quantidade } = req.body;
            const produto = await Produto.findByPk(produtoId);
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            const carrinho = await Carrinho.create({
                produtoId,
                quantidade
            });
            return res.status(201).json(carrinho);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Método para listar os itens no carrinho
    async listarCarrinho(req, res) {
        try {
            const carrinho = await Carrinho.findAll({
                include: [{ model: Produto }]
            });
            return res.status(200).json(carrinho);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Método para atualizar a quantidade de um produto no carrinho
    async atualizarCarrinho(req, res) {
        try {
            const { id_carrinho } = req.params;  // ID do item no carrinho
            const { quantidade } = req.body;     // Nova quantidade

            const itemCarrinho = await Carrinho.findByPk(id_carrinho);
            if (!itemCarrinho) {
                return res.status(404).json({ error: 'Item no carrinho não encontrado' });
            }

            // Atualizando a quantidade
            itemCarrinho.quantidade = quantidade;
            await itemCarrinho.save();

            return res.status(200).json(itemCarrinho);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Método para excluir um item do carrinho
    async excluirCarrinho(req, res) {
        try {
            const { id_carrinho } = req.params;  // ID do item no carrinho

            const itemCarrinho = await Carrinho.findByPk(id_carrinho);
            if (!itemCarrinho) {
                return res.status(404).json({ error: 'Item no carrinho não encontrado' });
            }

            // Excluindo o item do carrinho
            await itemCarrinho.destroy();

            return res.status(200).json({ message: 'Item excluído do carrinho com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Método para limpar o carrinho (excluir todos os itens)
    async limparCarrinho(req, res) {
        try {
            const usuarioId = req.user.id; // Supondo que o usuário esteja autenticado

            // Excluindo todos os itens do carrinho para o usuário
            await Carrinho.destroy({ where: { usuarioId } });

            return res.status(200).json({ message: 'Carrinho limpo com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};

module.exports = CarrinhoController;
