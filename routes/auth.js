const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

// Rota para processar o login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user/perfil', // Redireciona para o perfil
    failureRedirect: '/auth/login', // Redireciona de volta para login
    failureFlash: true
}));

// Rota para exibir o formulário de registro
router.get('/register', (req, res) => {
    res.render('register');
});

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
    const { nome, email, senha, confirmPassword, dataNascimento } = req.body;

    if (senha !== confirmPassword) {
        req.flash('error_msg', 'As senhas não coincidem!');
        return res.redirect('/auth/register');
    }

    try {
        const hashedSenha = await bcrypt.hash(senha, 10);
        await Usuario.create({ nome, email, senha: hashedSenha, data_nasc: dataNascimento });
        req.flash('success_msg', 'Cadastro realizado com sucesso!');
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error_msg', 'Erro ao cadastrar usuário');
        res.redirect('/auth/register');
    }
});

// Rota para fazer logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
