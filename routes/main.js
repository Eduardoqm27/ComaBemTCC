const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const multer = require('multer');
const path = require('path');
const produtoController = require('../controllers/ProdutoController');

// Middleware para obter o usuário da sessão e disponibilizá-lo nas views
router.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Define `user` como variável local para todas as views
    next();
});

// Configuração do multer para upload de imagens com validação de tipo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Apenas arquivos de imagem (jpeg, jpg, png, gif) são permitidos.'));
    }
};

const upload = multer({ storage, fileFilter });

// Rota para a página inicial (Destaques)
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { promocao: true } });
        res.render('index', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos em promoção:', error);
        res.status(500).send('Erro ao carregar a página inicial');
    }
});



// Rota para a página de ofertas
router.get('/ofertas', async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            where: {
                desconto: {
                    [Op.gt]: 0,  // Verifica se o desconto é maior que 0
                }
            }
        });
        res.render('ofertas', { categoria: 'Ofertas', produtos });
    } catch (error) {
        console.error('Erro ao buscar ofertas:', error);
        res.status(500).send('Erro ao carregar a página de Ofertas');
    }
});



// Rota para a categoria "Kits"
router.get('/kits', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria: 'kits' } });
        res.render('kits', { categoria: 'Kits', produtos });
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

        if (isNaN(preco) || preco <= 0) {
            return res.status(400).send('O preço deve ser um número válido e maior que 0.');
        }

        await Produto.create({
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

        res.redirect('/adicionar-produto');
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).send('Erro ao adicionar produto.');
    }
});

// Rotas de CRUD de produtos via API
// Rota para a página de edição do produto
router.get('/produtos', produtoController.listarProdutos); // Listar produtos
router.post('/adicionar-produto', upload.single('imagem'), produtoController.criarProduto); 
router.put('/adicionar-produto/:id', upload.single('imagem'), produtoController.atualizarProduto); // Atualizar produto
router.delete('/adicionar-produto/:id', produtoController.excluirProduto); // Excluir produto
router.get('/editar-produto/:id', produtoController.editarProduto); // Editar produto

module.exports = router;
