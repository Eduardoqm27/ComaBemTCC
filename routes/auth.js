const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Rota para exibir o formulário de registro
router.get('/register', (req, res) => {
    res.render('register'); // Certifique-se de que 'register.ejs' existe na pasta de views
});

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
    const { nome, email, dataNascimento, senha } = req.body;
    
    // Validação simples para senha
    if (!senha) {
        return res.status(400).send('Senha é obrigatória.');
    }

    // Validar se as senhas correspondem
    if (senha !== req.body.confirmPassword) {
        req.flash('error_msg', 'As senhas não coincidem!');
        return res.redirect('/auth/register');
    }

    try {
        const hashedSenha = await bcrypt.hash(senha, 10);
        await Usuario.create({ 
            nome, 
            email, 
            data_nasc: dataNascimento, 
            senha: hashedSenha 
        });

        req.flash('success_msg', 'Cadastro realizado com sucesso!');
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        req.flash('error_msg', 'Erro ao cadastrar o usuário.');
        res.redirect('/auth/register');
    }
});

// Rota para exibir o formulário de login
router.get('/login', (req, res) => {
    res.render('login'); // Adicione a view 'login.ejs'
});

// Rota para login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user/perfil', // Redireciona para a página de perfil após o login
    failureRedirect: '/auth/login',
    failureFlash: true
}));

// Rota para logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
