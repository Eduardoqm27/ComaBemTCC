const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Middleware para obter o usuário da sessão e disponibilizá-lo nas views
router.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Define `user` como variável local para todas as views
    next();
});

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'public/uploads/';
        
        // Verifica se o diretório existe, caso contrário, cria
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir); // Pasta onde as imagens serão armazenadas
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Nome único para cada imagem
    }
});
const upload = multer({ storage });

// Rota para a página inicial (Destaques)
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { promocao: true } });
        res.render('index', { produtos }); // `user` já está disponível em res.locals
    } catch (error) {
        console.error('Erro ao buscar produtos em promoção:', error);
        res.status(500).send('Erro ao carregar a página inicial');
    }
});

// Rota para a página de vegetais
router.get('/vegetais', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria: 'verdura' } });
        res.render('vegetais', { categoria: 'Vegetais', produtos }); // Renderiza uma view específica para vegetais
    } catch (error) {
        console.error('Erro ao buscar produtos da categoria Vegetais:', error);
        res.status(500).send('Erro ao carregar a página de Vegetais');
    }
});

// Rota para a página de ofertas
router.get('/ofertas', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { promocao: true } });
        res.render('ofertas', { categoria: 'Ofertas', produtos }); // Renderiza uma view específica para ofertas
    } catch (error) {
        console.error('Erro ao buscar ofertas:', error);
        res.status(500).send('Erro ao carregar a página de Ofertas');
    }
});

// Rota para a categoria "Kits"
router.get('/kits', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria: 'kits' } });
        res.render('kits', { categoria: 'Kits', produtos }); // Renderiza uma view específica para kits
    } catch (error) {
        console.error('Erro ao buscar produtos da categoria Kits:', error);
        res.status(500).send('Erro ao carregar a página de Kits');
    }
});

// Rota para a página "Sobre Nós"
router.get('/sobre', (req, res) => {
    res.render('sobre', { title: 'Sobre Nós' });
});

// Rota para exibir o formulário de adicionar produto
router.get('/adicionar-produto', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.render('adicionar-produto', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao carregar a página de adicionar produto');
    }
});

// Rota para adicionar um novo produto
router.post('/adicionar-produto', upload.single('imagem'), async (req, res) => {
    try {
        const { nome_produto, marca, origem, descricao, preco, categoria, promocao, destaque } = req.body;

        if (!nome_produto || !descricao || !preco || !categoria) {
            return res.status(400).send('Todos os campos obrigatórios precisam ser preenchidos.');
        }

        const produto = await Produto.create({
            nome_produto,
            marca,
            origem,
            descricao,
            preco,
            categoria,
            imagem: req.file ? req.file.filename : null,
            promocao: promocao === 'on',
            destaque: destaque === 'on',
        });

        res.redirect(`/produto/${produto.id}`); // Redireciona para a página do produto recém-adicionado
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).send('Erro ao adicionar produto.');
    }
});

module.exports = router;
