const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Pedido = require('../models/Pedido');

// Rota para exibir o formulário de cadastro
router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// Rota para processar o cadastro de usuário
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await Usuario.create({ nome, email, senha });
        res.redirect('/user/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar o usuário.');
    }
});

// Rota para exibir o formulário de login
router.get('/login', (req, res) => {
    res.render('login');
});

// Rota para processar o login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email, senha } });

        if (!usuario) {
            return res.status(401).send('Credenciais inválidas');
        }

        // Supondo que você armazene a sessão do usuário
        req.session.usuario = usuario;
        res.redirect('/user/perfil');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao realizar o login.');
    }
});

// Rota para exibir o perfil do usuário
router.get('/perfil', async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/user/login');
    }

    const usuario = req.session.usuario;

    try {
        const pedidos = await Pedido.findAll({ where: { usuarioId: usuario.id_usuario } });
        res.render('perfil', { usuario, pedidos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o perfil.');
    }
});

module.exports = router;
