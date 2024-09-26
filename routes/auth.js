const express = require('express');
const router = express.Router();

// Definindo a rota para cadastro de usuários
router.get('/cadastro', (req, res) => {
    res.render('cadastro'); // Certifique-se de que a view cadastro.ejs existe
});

// Definindo a rota para login de usuários
router.get('/login', (req, res) => {
    res.render('login'); // Certifique-se de que a view login.ejs existe
});

// Exportando as rotas
module.exports = router;
