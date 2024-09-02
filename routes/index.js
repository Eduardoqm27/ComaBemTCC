const express = require('express');
const router = express.Router();

// Importe os controladores
const ProdutoController = require('../controllers/ProdutoController');
const CarrinhoController = require('../controllers/CarrinhoController');
const AuthController = require('../controllers/AuthController');

// Definições das rotas
router.get('/', ProdutoController.getAllProdutos);
router.get('/sobre-nos', (req, res) => res.render('sobre-nos'));
router.get('/login', (req, res) => res.render('login'));
router.get('/cadastro', (req, res) => res.render('cadastro'));
router.get('/produtos/:id', ProdutoController.getProdutoById);
router.get('/categoria/:categoria', ProdutoController.getProdutosPorCategoria);
router.get('/pesquisar', ProdutoController.searchProdutos);
router.get('/carrinho', (req, res) => res.render('carrinho'));

// Rotas para adicionar produtos ao carrinho (POST)
router.post('/carrinho/add', CarrinhoController.addToCarrinho);

// Rotas para autenticação
router.post('/cadastro', AuthController.postCadastro);
router.post('/login', AuthController.postLogin);



// Exporte o roteador
module.exports = router;
