const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

// Página inicial com todos os produtos
router.get('/', ProdutoController.getAllProdutos);

// Páginas específicas para cada categoria
router.get('/frutas', ProdutoController.getFrutas);
router.get('/legumes', ProdutoController.getLegumes);
router.get('/verduras', ProdutoController.getVerduras);
router.get('/kits', ProdutoController.getKits);

// Página específica de um produto
router.get('/:id', ProdutoController.getProduto);

module.exports = router;