const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Pedido = require('../models/Pedido');
const bcrypt = require('bcryptjs'); // Alterado para bcryptjs
const { checkAuthenticated } = require('../middlewares/auth');

// Página de login/cadastro
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// Página do usuário (somente acessível após login)
router.get('/perfil', checkAuthenticated, async (req, res) => {
    try {
        const usuarioId = req.session.userId || req.user.id;
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

        // Verifica se a senha está correta
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            console.log('Senha inválida');
            return res.status(401).send('Email ou senha inválidos');
        }

        // Atribui o ID do usuário à sessão
        req.session.userId = usuario.id;
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
        // Verifica se o e-mail já está cadastrado
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).send('Email já está em uso.');
        }

        // Gera o hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Cria o usuário no banco de dados
        const usuario = await Usuario.create({
            nome,
            email,
            senha: hashedPassword,
            data_nasc
        });

        // Atribui o ID do usuário à sessão
        req.session.userId = usuario.id;
        res.redirect('/user/perfil');
    } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
        res.status(500).send('Erro ao cadastrar o usuário.');
    }
});

module.exports = router;
