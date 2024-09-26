// routes/carrinho.js
const express = require('express');
const router = express.Router();
const Carrinho = require('../models/Carrinho'); // Supondo que você tenha um modelo de Carrinho

// Rota para a página do carrinho
router.get('/', async (req, res) => {
    try {
        // Aqui você deve buscar os itens do carrinho. Vou presumir que você tem uma função para isso
        const itens = await Carrinho.findAll(); // Altere para o método adequado de busca

        res.render('carrinho', { itens }); // Passando a lista de itens para a view
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o carrinho');
    }
});

module.exports = router;
