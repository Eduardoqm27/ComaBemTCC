const express = require('express');
const router = express.Router();
const CarrinhoController = require('../controllers/CarrinhoController');

router.post('/carrinho/add', (req, res) => {
    console.log('routes/carrinho/add');
    CarrinhoController.addToCarrinho(req, res);
});

module.exports = router;