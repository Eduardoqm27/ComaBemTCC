const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/cadastro', AuthController.postCadastro);
router.post('/login', AuthController.postLogin);

module.exports = router;