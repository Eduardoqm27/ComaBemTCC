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

// Middleware para validar ID
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ sucesso: false, mensagem: 'ID inválido.' });
    }
    next();
};

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
                    [Op.gt]: 0, // Verifica se o desconto é maior que 0
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
router.post('/adicionar-produto', (req, res, next) => {
    upload.single('imagem')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).send('Erro no upload da imagem: ' + err.message);
        } else if (err) {
            return res.status(400).send('Erro: ' + err.message);
        }
        next();
    });
}, produtoController.criarProduto);

// Rotas de CRUD de produtos via API
router.get('/produtos', produtoController.listarProdutos); // Listar produtos
router.get('/editar-produto/:id', validateId, produtoController.editarProduto); // Editar produto
router.put('/atualizar-produto/:id', validateId, upload.single('imagem'), produtoController.atualizarProduto); 
router.delete('/excluir-produto/:id', validateId, produtoController.excluirProduto); // Excluir produto

module.exports = router;
