const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

// Rota para a tela inicial
router.get('/', ProdutoController.telaInicial);

// Rota para categoria de vegetais
router.get('/vegetais', ProdutoController.categoriaVegetais);

// Rota para categoria de kits
router.get('/kits', ProdutoController.categoriaKits);

// Rota para ofertas (promoções)
router.get('/ofertas', ProdutoController.ofertas);

// Rota para sobre nós
router.get('/sobre', ProdutoController.sobreNos);

// Rota para adicionar produto (apenas para vendedores)
router.get('/adicionar-produto', ProdutoController.adicionarProduto);

// Rota para salvar o produto adicionado
router.post('/adicionar-produto', ProdutoController.salvarProduto);

module.exports = router;
