const express = require('express');
const router = express.Router();

// Importação dos controladores
const ProdutoController = require('../controllers/ProdutoController');
const CarrinhoController = require('../controllers/CarrinhoController');
const AuthController = require('../controllers/AuthController');

console.log('Rotas carregadas');

// Definições das rotas
router.get('/', (req, res) => {
    console.log('Rota / chamada');
    ProdutoController.getAllProdutos(req, res);
});
router.get('/sobre-nos', (req, res) => res.render('pages/sobre-nos'));
router.get('/login', (req, res) => res.render('auth/login'));
router.get('/cadastro', (req, res) => res.render('auth/cadastro'));
router.get('/produtos/:id', (req, res) => {
    console.log('Rota /produtos/:id chamada');
    ProdutoController.getProdutoById(req, res);
});
router.get('/categoria/:categoria', (req, res) => {
    console.log('Rota /categoria/:categoria chamada');
    ProdutoController.getProdutosPorCategoria(req, res);
});
router.get('/pesquisar', (req, res) => {
    console.log('Rota /pesquisar chamada');
    ProdutoController.searchProdutos(req, res);
});
router.get('/carrinho', (req, res) => res.render('carrinho'));

// Rotas para adicionar produtos ao carrinho (POST)
router.post('/carrinho/add', (req, res) => {
    console.log('Rota /carrinho/add chamada');
    CarrinhoController.addToCarrinho(req, res);
});

// Rotas para autenticação
router.post('/cadastro', (req, res) => {
    console.log('Rota /cadastro chamada');
    AuthController.postCadastro(req, res);
});
router.post('/login', (req, res) => {
    console.log('Rota /login chamada');
    AuthController.postLogin(req, res);
});

// Exporte o roteador
module.exports = router;
