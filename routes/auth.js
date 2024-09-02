const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/cadastro', AuthController.postCadastro);
router.get('/login', (req, res) => {
    res.render('login'); 
});

router.post('/login', AuthController.postLogin);
router.get('/cadastro', (req, res) => {
    res.render('cadastro'); 
});

module.exports = router;