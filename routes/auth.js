const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Rota para exibir o login
router.get('/login', AuthController.getLogin);

// Rota para processar o login
router.post('/login', AuthController.postLogin);

// Rota para exibir o cadastro
router.get('/cadastro', AuthController.getCadastro);

// Rota para processar o cadastro
router.post('/cadastro', AuthController.postCadastro);

module.exports = router;