const express = require('express'); 
const authController = require('../controllers/AuthController');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', authController.login);

// Rota para exibir o formulário de registro
router.get('/register', (req, res) => {
    res.render('register');
});

// Rota para registrar um novo usuário
router.post('/register', authController.cadastro);

// Rota para fazer logout
router.get('/logout', authController.logout);

module.exports = router;
