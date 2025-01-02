const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const multer = require('multer');
const { Op } = require('sequelize');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/'); // Pasta onde as imagens serão armazenadas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nome único para cada imagem
    }
});
const upload = multer({ storage });

// Rota para exibir produtos filtrados por categoria e/ou busca
router.get('/categoria', async (req, res) => {
    try {
        const { search, categoria } = req.query;

        // Construção dinâmica da cláusula where
        let whereClause = {};
        if (search) {
            whereClause.nome_produto = { [Op.like]: `%${search}%` };
        }
        if (categoria) {
            whereClause.categoria = categoria;
        }

        const produtos = await Produto.findAll({ where: whereClause });
        res.render('categoria', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao carregar a página de categorias.');
    }
});

// Rota para adicionar um novo produto
router.post('/adicionar', upload.single('imagem'), async (req, res) => {
    try {
        const { nome_produto, marca, origem, descricao, preco, categoria, promocao, destaque } = req.body;

        await Produto.create({
            nome_produto,
            marca,
            origem,
            descricao,
            preco,
            categoria,
            imagem: req.file ? req.file.filename : null, // Armazenando o nome da imagem
            promocao: promocao === 'on',
            destaque: destaque === 'on'
        });

        res.redirect('/categoria');
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).send('Erro ao adicionar produto.');
    }
});

// Rota para editar um produto existente
router.post('/editar/:id', upload.single('imagem'), async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_produto, marca, origem, descricao, preco, categoria, promocao, destaque } = req.body;
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }

        // Atualizando os dados do produto
        await produto.update({
            nome_produto,
            marca,
            origem,
            descricao,
            preco,
            categoria,
            imagem: req.file ? req.file.filename : produto.imagem, // Verifica se há imagem nova
            promocao: promocao === 'on',
            destaque: destaque === 'on'
        });

        res.redirect('/categoria');
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        res.status(500).send('Erro ao editar produto.');
    }
});

// Rota para destacar um produto
router.post('/destaque/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }

        await produto.update({ destaque: !produto.destaque }); // Alterna o destaque
        res.redirect('/categoria');
    } catch (error) {
        console.error('Erro ao destacar produto:', error);
        res.status(500).send('Erro ao destacar produto.');
    }
});

// Rota para aplicar promoção a um produto
router.post('/promocao/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }

        await produto.update({ promocao: !produto.promocao }); // Alterna o status de promoção
        res.redirect('/categoria');
    } catch (error) {
        console.error('Erro ao aplicar promoção no produto:', error);
        res.status(500).send('Erro ao aplicar promoção no produto.');
    }
});

// Rota para listar produtos em promoção
router.get('/ofertas', async (req, res) => {
    try {
        const produtosPromocao = await Produto.findAll({ where: { promocao: true } });
        res.render('ofertas', { produtosPromocao });
    } catch (error) {
        console.error('Erro ao carregar as ofertas:', error);
        res.status(500).send('Erro ao carregar as ofertas.');
    }
});

// Rota para exibir detalhes de um produto
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }

        res.render('produto', { produto });
    } catch (error) {
        console.error('Erro ao carregar o produto:', error);
        res.status(500).send('Erro ao carregar o produto.');
    }
});

module.exports = router;
