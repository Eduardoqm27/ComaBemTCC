const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rota para exibir a página de login
router.get('/login', (req, res) => {
    res.render('login');  // Renderiza a página de login
});

// Rota para processar o login
router.post('/login', UserController.login);



module.exports = router;
