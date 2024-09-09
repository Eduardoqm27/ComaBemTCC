const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

// Rota para categorias
router.get('/:categoria', ProdutoController.getProdutosPorCategoria); // Captura categorias como parâmetro

// Página de listagem de produtos
router.get('/listagem', ProdutoController.getAllProdutos);

// Outras rotas
router.get('/adicionar', ProdutoController.getAddProdutoForm);
router.post('/adicionar', ProdutoController.addProduto);
router.get('/editar/:id', ProdutoController.getEditProdutoForm);
router.post('/editar/:id', ProdutoController.editProduto);
router.get('/excluir/:id', ProdutoController.deleteProduto);

module.exports = router;