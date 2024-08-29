const express = require('express');
const router = express.Router();
const CarrinhoController = require('../controllers/CarrinhoController');

// Rota do carrinho
router.get('/', CarrinhoController.getCarrinho);

module.exports = router;