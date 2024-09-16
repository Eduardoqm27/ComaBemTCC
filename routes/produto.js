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

// routespara obter um produto específico pelo ID
router.get('/produtos/:id', ProdutoController.getProdutoById);

router.get('/sobre-nos', (req, res) => res.render('pages/sobre-nos'));
router.get('/login', (req, res) => res.render('auth/login'));
router.get('/cadastro', (req, res) => res.render('auth/cadastro'));
router.get('/produtos/:id', (req, res) => {
    console.log('routes/produtos/:id ');
    ProdutoController.getProdutoById(req, res);
});
router.get('/categoria/:categoria', (req, res) => {
    console.log('routes/categoria/:categoria ');
    ProdutoController.getProdutosPorCategoria(req, res);
});
router.get('/pesquisar', (req, res) => {
    console.log('routes/pesquisar ');
    ProdutoController.searchProdutos(req, res);
});
router.get('/carrinho', (req, res) => res.render('carrinho'));