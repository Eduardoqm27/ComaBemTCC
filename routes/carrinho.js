const express = require('express');
const router = express.Router();
const Carrinho = require('../models/Carrinho');
const Produto = require('../models/Produto');

// Controlador de Carrinho
const carrinhoController = require('../controllers/carrinhoController');

// Rota para visualizar o carrinho
router.get('/', async (req, res) => {
    try {
        const itensCarrinho = await Carrinho.findAll({
            include: { 
                model: Produto, 
                as: 'produto',  // Adicionando o alias correto
                attributes: ['nome_produto', 'preco', 'imagem']  // Certifique-se de que os atributos estão corretos
            }
        });

        // Calcular subtotal
        const subtotal = itensCarrinho.reduce((acc, item) => {
            return acc + item.quantidade * item.produto.preco;
        }, 0);

        res.render('carrinho', { itensCarrinho, subtotal });
    } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
        res.status(500).send('Erro ao carregar o carrinho');
    }
});

router.post('/adicionar', async (req, res) => {
    try {
        let { produtoId } = req.body;
        console.log('produtoId recebido no backend:', produtoId);  // Adiciona um log aqui

        produtoId = parseInt(produtoId, 10);
        if (isNaN(produtoId) || produtoId <= 0) {
            return res.status(400).json({ error: 'ID do produto inválido.' });
        }
        

        const produto = await Produto.findByPk(produtoId);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        await Carrinho.create({ produtoId, quantidade: 1 });
        res.redirect('/carrinho');
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        res.status(500).send('Erro ao adicionar produto ao carrinho');
    }
});



// Rota para editar a quantidade de um item no carrinho
router.put('/editar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;

        const carrinhoItem = await Carrinho.findByPk(id);
        if (!carrinhoItem) {
            return res.status(404).send('Item não encontrado no carrinho');
        }

        carrinhoItem.quantidade = quantidade;
        await carrinhoItem.save();

        res.redirect('/carrinho');
    } catch (error) {
        console.error('Erro ao editar produto no carrinho:', error);
        res.status(500).send('Erro ao editar produto no carrinho');
    }
});

// Rota para remover item do carrinho
router.delete('/remover/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const carrinhoItem = await Carrinho.findByPk(id);
        if (!carrinhoItem) {
            return res.status(404).send('Item não encontrado no carrinho');
        }

        await carrinhoItem.destroy();
        res.redirect('/carrinho');
    } catch (error) {
        console.error('Erro ao remover produto do carrinho:', error);
        res.status(500).send('Erro ao remover produto do carrinho');
    }
});

// Rota para finalizar a compra
router.post('/finalizar', async (req, res) => {
    try {
        const itensCarrinho = await Carrinho.findAll({
            include: { model: Produto, as: 'produto' }
        });

        if (!itensCarrinho.length) {
            return res.status(400).send('Carrinho vazio.');
        }

        const total = itensCarrinho.reduce((acc, item) => {
            return acc + item.quantidade * item.produto.preco;
        }, 0);

        // Limpar o carrinho após a compra
        await Carrinho.destroy({ where: {} });

        res.send(`Compra finalizada com sucesso! Total: R$ ${total.toFixed(2)}`);
    } catch (error) {
        console.error('Erro ao finalizar compra:', error);
        res.status(500).send('Erro ao finalizar compra');
    }
});

module.exports = router;
