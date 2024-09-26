const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto'); // Certifique-se de ter o modelo correto

// Rota para a página de categorias
router.get('/categoria', async (req, res) => {
    try {
        const produtos = await Produto.findAll(); // Busque os produtos do banco de dados
        res.render('categoria', { produtos }); // Renderize a view 'categoria' e passe os produtos
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar a categoria');
    }
});

module.exports = router;