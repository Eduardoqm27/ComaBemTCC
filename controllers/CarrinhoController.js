const Produto = require('../models/Produto');
const Carrinho = require('../models/Carrinho');

// Adicionar produto ao carrinho
// Adicionar produto ao carrinho
// Adicionar produto ao carrinho
const addProdutoCarrinho = async (req, res) => {
    try {
        let { produtoId } = req.body; // Obtemos o produtoId do formulário
        produtoId = parseInt(produtoId, 10); // Certifique-se de que produtoId é um número inteiro
        
        if (isNaN(produtoId) || produtoId <= 0) {
            return res.status(400).json({ error: 'ID do produto inválido.' });
        }
        

        const produto = await Produto.findByPk(produtoId);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        // Verificar se o produto já está no carrinho
        const carrinhoItem = await Carrinho.findOne({ where: { produtoId } });

        if (carrinhoItem) {
            carrinhoItem.quantidade += 1;
            await carrinhoItem.save();
        } else {
            await Carrinho.create({ produtoId, quantidade: 1 });
        }

        return res.redirect('/carrinho'); // Redireciona para a página do carrinho
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
            include: [{ model: Produto, as: 'produto' }]
        });

        if (!itensCarrinho.length) {
            return res.status(400).json({ error: 'Carrinho vazio.' });
        }

        const total = itensCarrinho.reduce((acc, item) => {
            return acc + item.quantidade * item.produto.preco;
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
