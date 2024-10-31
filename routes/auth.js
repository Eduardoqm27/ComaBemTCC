const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const router = express.Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/register', async (req, res) => {
    const { nome, email, dataNascimento, senha, role } = req.body;
    const hashedSenha = await bcrypt.hash(senha, 10);
    await Usuario.create({ nome, email, dataNascimento, senha: hashedSenha, role });
    res.redirect('/login');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
