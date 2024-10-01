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

// Lógica para login do usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario || !(await usuario.verificaSenha(senha))) { // Supondo que você tenha um método verificaSenha
            return res.status(401).send('Email ou senha inválidos');
        }
        req.session.userId = usuario.id; // Armazenar o ID do usuário na sessão
        res.redirect('/user/perfil'); // Redirecionar para o perfil do usuário após login
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar o login.');
    }
});

// Lógica para cadastro do usuário
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha, data_nasc } = req.body; // Adicionando data_nasc aqui
    try {
        const usuario = await Usuario.create({ nome, email, senha, data_nasc }); // Incluindo data_nasc
        req.session.userId = usuario.id; // Armazenar o ID do usuário na sessão
        res.redirect('/user/perfil'); // Redirecionar para o perfil do usuário após cadastro
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar o usuário.');
    }
});

module.exports = router;
