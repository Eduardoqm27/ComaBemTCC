const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

// Páginas específicas para cada categoria
router.get('/', ProdutoController.getAllProdutos);
router.get('/frutas', ProdutoController.getFrutas);
router.get('/legumes', ProdutoController.getLegumes);
router.get('/verduras', ProdutoController.getVerduras);
router.get('/kits', ProdutoController.getKits);

module.exports = router;
