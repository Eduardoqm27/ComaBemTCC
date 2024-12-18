const Produto = require('../models/Produto');
const Carrinho = require('../models/Carrinho');

// Adicionar produto ao carrinho
const addProdutoCarrinho = async (req, res) => {
    try {
        const { produtoId, quantidade } = req.body;

        const produto = await Produto.findByPk(produtoId);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        // Verificar se o produto já está no carrinho
        const carrinhoItem = await Carrinho.findOne({ where: { produtoId } });

        if (carrinhoItem) {
            carrinhoItem.quantidade += quantidade;
            await carrinhoItem.save();
        } else {
            await Carrinho.create({ produtoId, quantidade });
        }

        return res.status(200).json({ message: 'Produto adicionado ao carrinho.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Editar quantidade de um produto no carrinho
const editarProdutoCarrinho = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;

        const carrinhoItem = await Carrinho.findByPk(id);
        if (!carrinhoItem) {
            return res.status(404).json({ error: 'Item não encontrado no carrinho.' });
        }

        carrinhoItem.quantidade = quantidade;
        await carrinhoItem.save();

        return res.status(200).json({ message: 'Quantidade atualizada com sucesso.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Remover produto do carrinho
const removerProdutoCarrinho = async (req, res) => {
    try {
        const { id } = req.params;

        const carrinhoItem = await Carrinho.findByPk(id);
        if (!carrinhoItem) {
            return res.status(404).json({ error: 'Item não encontrado no carrinho.' });
        }

        await carrinhoItem.destroy();
        return res.status(200).json({ message: 'Produto removido do carrinho.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Finalizar compra
const finalizarCompra = async (req, res) => {
    try {
        const itensCarrinho = await Carrinho.findAll({
            include: [{ model: Produto }]
        });

        if (!itensCarrinho.length) {
            return res.status(400).json({ error: 'Carrinho vazio.' });
        }

        const total = itensCarrinho.reduce((acc, item) => {
            return acc + item.quantidade * item.Produto.preco;
        }, 0);

        // Limpar o carrinho após a compra
        await Carrinho.destroy({ where: {} });

        return res.status(200).json({ message: 'Compra finalizada com sucesso!', total });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addProdutoCarrinho,
    editarProdutoCarrinho,
    removerProdutoCarrinho,
    finalizarCompra
};
