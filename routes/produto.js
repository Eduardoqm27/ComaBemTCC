const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

router.get('/categoria', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.render('categoria', { produtos, layout: false });  // layout: false renderiza só o conteúdo
    } catch (error) {
        res.status(500).send('Erro ao carregar categorias');
    }
});

module.exports = router;
