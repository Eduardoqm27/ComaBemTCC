const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Rota para a página inicial (Destaques)
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { promocao: true } });
        res.render('index', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos em promoção:', error);
        res.status(500).send('Erro ao carregar a página inicial');
    }
});

// Rota para a página de categorias (Vegetais)
router.get('/categoria', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria: 'Vegetais' } });
        res.render('categoria', { produtos });
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).send('Erro ao carregar a página de categorias');
    }
});

// Rota para a página de kits
router.get('/kits', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria: 'kits' } });
        res.render('kits', { produtos });
    } catch (error) {
        console.error('Erro ao buscar kits:', error);
        res.status(500).send('Erro ao carregar a página de kits');
    }
});

// Rota para a página de ofertas
router.get('/ofertas', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { promocao: true } });
        res.render('ofertas', { produtos });
    } catch (error) {
        console.error('Erro ao buscar ofertas:', error);
        res.status(500).send('Erro ao carregar a página de ofertas');
    }
});

module.exports = router;
