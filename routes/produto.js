const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

router.get('/produto/:id', ProdutoController.getProdutoById);

// Rota para exibir o formulário de adição de produtos
router.get('/adicionar', (req, res) => {
    res.render('adicionar-produto');
});

// Rota para adicionar um produto
router.post('/adicionar', ProdutoController.addProduto);

module.exports = router;