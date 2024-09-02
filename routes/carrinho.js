const express = require('express');
const router = express.Router();
const CarrinhoController = require('../controllers/CarrinhoController');

router.post('/add', CarrinhoController.addToCarrinho);

module.exports = router;