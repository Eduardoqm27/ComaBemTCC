const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Pedido = require('../models/Pedido'); // Supondo que você tem um modelo Pedido
const bcrypt = require('bcrypt'); // Importa o bcrypt para a verificação da senha
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
        const usuarioId = req.session.userId || req.user.id; // Captura o ID do usuário da sessão ou do Passport
        const usuario = await Usuario.findByPk(usuarioId);
        const pedidos = await Pedido.findAll({ where: { usuarioId } });

        res.render('perfil', { usuario, pedidos });
    } catch (error) {
        console.error('Erro ao carregar perfil do usuário:', error);
        res.status(500).send('Erro ao carregar o perfil do usuário.');
    }
});

// Lógica para login do usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            console.log('Usuário não encontrado');
            return res.status(401).send('Email ou senha inválidos');
        }

        // Verifica a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            console.log('Senha inválida');
            return res.status(401).send('Email ou senha inválidos');
        }

        // Armazena o ID do usuário na sessão
        req.session.userId = usuario.id;

        // Redireciona para o perfil do usuário após login
        res.redirect('/user/perfil');
    } catch (error) {
        console.error('Erro ao processar o login:', error);
        res.status(500).send('Erro ao processar o login.');
    }
});

// Lógica para cadastro do usuário
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha, data_nasc } = req.body;

    try {
        // Gera o hash da senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(senha, 10);

        const usuario = await Usuario.create({ 
            nome, 
            email, 
            senha: hashedPassword, // Armazena a senha como hash
            data_nasc 
        });

        // Armazena o ID do usuário na sessão
        req.session.userId = usuario.id;

        // Redireciona para o perfil do usuário após cadastro
        res.redirect('/user/perfil');
    } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
        res.status(500).send('Erro ao cadastrar o usuário.');
    }
});

module.exports = router;
