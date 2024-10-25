const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/AuthController');

// Rota de cadastro
router.post('/cadastro', AuthController.cadastro);

// Rota de login usando Passport
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/user/perfil',
        failureRedirect: '/auth/login',
        failureFlash: true // Mensagens flash em caso de falha
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Você saiu com sucesso!'); // Mensagem de sucesso
    res.redirect('/auth/login'); // Redireciona para a página de login
});

module.exports = router;
