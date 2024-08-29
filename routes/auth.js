const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Rotas de autenticação
router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);
router.get('/cadastro', AuthController.getCadastro);
router.post('/cadastro', AuthController.postCadastro);

module.exports = router;