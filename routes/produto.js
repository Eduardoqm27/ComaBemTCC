const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const multer = require('multer');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Rota para exibir os produtos da categoria
router.get('/categoria', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.render('categoria', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao carregar a página de categorias');
    }
});

// Rota para adicionar um novo produto
router.post('/adicionar', upload.single('imagem'), async (req, res) => {
    try {
        const { nome_produto, marca, origem, descricao, preco, categoria, promocao } = req.body;
        const novoProduto = await Produto.create({
            nome_produto,
            marca,
            origem,
            descricao,
            preco,
            categoria,
            imagem: req.file.filename,
            promocao: promocao ? true : false
        });
        
        // Redireciona para a página inicial após adicionar o produto
        res.redirect('/'); // Altera o redirecionamento para a página inicial
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).send('Erro ao adicionar produto');
    }
});

// Rota para visualizar o produto detalhado
router.get('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (produto) {
            res.render('produto-detalhe', { produto });
        } else {
            res.status(404).send('Produto não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).send('Erro ao buscar produto');
    }
});

module.exports = router;
