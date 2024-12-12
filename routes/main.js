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


router.get('/vegetais', (req, res) => {
    Produto.findAll({ where: { categoria: 'verdura' } })
        .then(produtos => {
            res.render('categoria', { categoria: 'Vegetais', produtos });
        })
        .catch(err => console.error(err));
});

router.get('/kits', (req, res) => {
    Produto.findAll({ where: { categoria: 'kits' } })
        .then(produtos => {
            res.render('kits', { categoria: 'Kits', produtos });
        })
        .catch(err => console.error(err));
});

router.get('/ofertas', (req, res) => {
    Produto.findAll({ where: { promocao: true } })
        .then(produtos => {
            res.render('categoria', { categoria: 'Ofertas', produtos });
        })
        .catch(err => console.error(err));
});


router.get('/sobre', (req, res) => {
    res.render('sobre', { title: 'Sobre Nós' });
});

module.exports = router;
