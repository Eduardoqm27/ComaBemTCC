const express = require('express');
const router = express.Router();
const Carrinho = require('../models/Carrinho');
const Produto = require('../models/Produto');

// Rota para visualizar o carrinho
router.get('/', async (req, res) => {
    try {
        const itensCarrinho = await Carrinho.findAll({
            include: { model: Produto, attributes: ['nome', 'preco'] } // Inclui nome e preço do produto
        });
        res.render('carrinho', { itensCarrinho });
    } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
        res.status(500).send('Erro ao carregar o carrinho');
    }
});

// Rota para adicionar item ao carrinho
router.post('/adicionar', async (req, res) => {
    try {
        const { produtoId } = req.body;
        const quantidade = 1; // Quantidade padrão

        await Carrinho.create({ produtoId, quantidade });
        res.redirect('/carrinho');
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        res.status(500).send('Erro ao adicionar produto ao carrinho');
    }
});

// Rota para criar novo produto com destaque ou desconto
router.post('/novo-produto', async (req, res) => {
    try {
        const { nome, preco, categoria, descricao, destaque, desconto } = req.body;

        const precoComDesconto = desconto ? preco - (preco * (desconto / 100)) : preco;

        const novoProduto = await Produto.create({
            nome,
            preco: precoComDesconto,
            categoria,
            descricao,
            destaque: destaque ? true : false,
        });

        if (destaque) {
            // Redireciona para o index se o produto for destaque
            res.redirect('/index');
        } else if (desconto) {
            // Redireciona para ofertas se o produto tiver desconto
            res.redirect('/ofertas');
        } else {
            // Caso contrário, redireciona para a página de categorias
            res.redirect('/categoria');
        }
    } catch (error) {
        console.error('Erro ao criar novo produto:', error);
        res.status(500).send('Erro ao criar novo produto');
    }
});

// Rota para visualizar detalhes do produto
router.get('/detalhes/:id', async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }
        res.render('detalhes', { produto });
    } catch (error) {
        console.error('Erro ao carregar detalhes do produto:', error);
        res.status(500).send('Erro ao carregar detalhes do produto');
    }
});

module.exports = router;
