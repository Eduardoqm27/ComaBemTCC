const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const produtoController = require('../controllers/ProdutoController');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

// Rotas de produtos
router.get('/produtos', produtoController.listarProdutos); // Listar produtos
router.post('/adicionar-produto', upload.single('imagem'), produtoController.criarProduto); // Criar produto
router.put('/adicionar-produto/:id', upload.single('imagem'), produtoController.atualizarProduto); // Atualizar produto
router.delete('/adicionar-produto/:id', produtoController.excluirProduto); // Excluir produto
router.get('/editar-produto/:id', produtoController.editarProduto); // Editar produto

module.exports = router;
