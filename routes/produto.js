const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

// Rotas de produtos
router.get('/:id', ProdutoController.getProdutoById);

module.exports = router;
