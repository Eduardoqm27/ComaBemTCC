const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

// Rota para listar produtos
router.get('/produtos', ProdutoController.getAllProdutos);

// Rota para exibir o formulário de adição de produto
router.get('/produtos/adicionar', ProdutoController.getAddProdutoForm);

// Rota para adicionar um novo produto
router.post('/produtos/adicionar', ProdutoController.addProduto);

// Rota para exibir o formulário de edição de produto
router.get('/produtos/editar/:id', ProdutoController.getEditProdutoForm);

// Rota para editar um produto
router.post('/produtos/editar/:id', ProdutoController.editProduto);

// Rota para excluir um produto
router.post('/produtos/deletar/:id', ProdutoController.deleteProduto);

module.exports = router;