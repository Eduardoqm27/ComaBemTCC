const express = require('express');
const router = express.Router();  
const Carrinho = require('../models/Carrinho'); 

// Rota para visualizar o carrinho
router.get('/', async (req, res) => {
    try {
        const itensCarrinho = await Carrinho.findAll(); 
        res.render('carrinho', { itensCarrinho }); // Renderiza a página do carrinho
    } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
        res.status(500).send('Erro ao carregar o carrinho');
    }
});

// Rota para adicionar item ao carrinho
router.post('/adicionar', async (req, res) => {
    try {
        const { produtoId, quantidade } = req.body;
        const novoItem = await Carrinho.create({ produtoId, quantidade });
        res.status(201).json(novoItem); 
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        res.status(500).send('Erro ao adicionar produto ao carrinho');
    }
});

module.exports = router;
