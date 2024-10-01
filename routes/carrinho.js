const express = require('express');
const router = express.Router();  // Definindo o router
const Carrinho = require('../models/Carrinho'); // Importe o modelo Carrinho, se necessário

// Rota para adicionar item ao carrinho
router.post('/adicionar', async (req, res) => {
    try {
        const { produtoId, quantidade } = req.body;

        // Lógica para adicionar o produto ao carrinho
        const novoItem = await Carrinho.create({ produtoId, quantidade });

        res.status(201).json(novoItem);  // Envie uma resposta de sucesso
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        res.status(500).send('Erro ao adicionar produto ao carrinho');
    }
});

module.exports = router;
