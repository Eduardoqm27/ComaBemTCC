const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/cadastro', (req, res) => {
    console.log('routes/cadastro');
    AuthController.postCadastro(req, res);
});
router.post('/login', (req, res) => {
    console.log('routes/login');
    AuthController.postLogin(req, res);
});

module.exports = router;

