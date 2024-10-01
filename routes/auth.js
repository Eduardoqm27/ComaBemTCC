const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/AuthController');

router.post('/cadastro', AuthController.cadastro); // Rota de cadastro

// Rota de login usando Passport
router.post('/login', passport.authenticate('local', {
    successRedirect: '/', // Redireciona para a página inicial em caso de sucesso
    failureRedirect: '/user/login', // Redireciona para a página de login em caso de falha
    failureFlash: true // Permite mensagens de falha
}));

router.get('/logout', (req, res) => {
    req.logout(); // Método para sair do usuário
    res.redirect('/user/login'); // Redireciona para a página de login após logout
});

module.exports = router;
