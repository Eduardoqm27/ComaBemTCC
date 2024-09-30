const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Pedido = require('../models/Pedido'); // Supondo que você tem um modelo Pedido
const { isAuthenticated } = require('../middlewares/auth');

// Página de login/cadastro
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// Página do usuário (somente acessível após login)
router.get('/perfil', isAuthenticated, async (req, res) => {
    try {
        const usuarioId = req.user.id; // Supondo que `req.user` contém os dados do usuário autenticado
        const usuario = await Usuario.findByPk(usuarioId);
        const pedidos = await Pedido.findAll({ where: { usuarioId } });

        res.render('perfil', { usuario, pedidos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o perfil do usuário.');
    }
});

module.exports = router;
