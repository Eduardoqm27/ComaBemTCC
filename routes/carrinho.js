const express = require('express');
const router = express.Router();  
const Carrinho = require('../models/Carrinho'); 
const Produto = require('../models/Produto'); // Importa o modelo Produto

// Rota para visualizar o carrinho
router.get('/', async (req, res) => {
    try {
        const itensCarrinho = await Carrinho.findAll({
            include: { model: Produto, attributes: ['nome'] } // Inclui o nome do produto
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
        
        // Defina uma quantidade padrão ou obtenha do formulário, se necessário
        const quantidade = 1; // Adiciona 1 por padrão

        const novoItem = await Carrinho.create({ produtoId, quantidade });
        res.redirect('/carrinho'); // Redireciona para a página do carrinho após adicionar
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        res.status(500).send('Erro ao adicionar produto ao carrinho');
    }
});

module.exports = router;
