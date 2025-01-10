const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Produto = require('../models/Produto');
const produtoController = require('../controllers/produtoController');

// Middleware para obter o usuário da sessão e disponibilizá-lo nas views
router.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Define `user` como variável local para todas as views
    next();
});

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

// Rotas principais
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { promocao: true } });
        res.render('index', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos em promoção:', error);
        res.status(500).send('Erro ao carregar a página inicial');
    }
});

// Rota para visualizar categoria (vegetais)
router.get('/categoria', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria: 'Vegetais' } });
        res.render('categoria', { produtos });
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).send('Erro ao carregar a página de categorias');
    }
});

// Rota para listar produtos de categorias específicas (chamando funções do controlador)
router.get('/vegetais', produtoController.listarVegetais);
router.get('/kits', produtoController.listarKits);
router.get('/ofertas', produtoController.listarOfertas);

// Rota sobre
router.get('/sobre', (req, res) => res.render('sobre', { title: 'Sobre Nós' }));

// Rotas de gerenciamento de produtos
router.get('/adicionar-produto', produtoController.formularioAdicionarProduto);

// Adicionar produto via POST
router.post('/adicionar-produto', upload.single('imagem'), produtoController.criarProduto);

// Rota para exibir o formulário de edição de um produto (GET)
router.get('/editar-produto/:id', produtoController.editarProduto); // Exibe o formulário de edição
router.post('/editar-produto', upload.single('imagem'), produtoController.editarProduto);

// Rota para editar um produto via PUT (Atualização)
router.put('/editar-produto/:id', upload.single('imagem'), produtoController.atualizarProduto); // Atualiza o produto no banco

// Rota para deletar um produto (DELETE)
router.delete('/deletar-produto/:id', produtoController.deletarProduto);
router.post('/deletar-produto', upload.single('imagem'), produtoController.deletarProduto);

; // Deleta o produto do banco

module.exports = router;
