const Produto = require('../models/Produto');
const { Op } = require('sequelize');

module.exports = {
    // Tela Inicial (Destaques)
    telaInicial: async (req, res) => {
        try {
            const produtos = await Produto.findAll();
            const produtosPromocao = produtos.filter(produto => produto.promocao); // Filtra os produtos com promoção
            res.render('index', { produtos: produtosPromocao });
        } catch (err) {
            res.status(500).send("Erro ao listar produtos");
        }
    },

    // Página de Vegetais
    categoriaVegetais: async (req, res) => {
        try {
            const produtos = await Produto.findAll({ where: { categoria: 'vegetal' } });
            res.render('categoria', { produtos });
        } catch (err) {
            res.status(500).send("Erro ao listar vegetais");
        }
    },

    // Página de Kits
    categoriaKits: async (req, res) => {
        try {
            const produtos = await Produto.findAll({ where: { categoria: 'kit' } });
            res.render('kits', { produtos });
        } catch (err) {
            res.status(500).send("Erro ao listar kits");
        }
    },

    // Página de Ofertas (Promoções)
    ofertas: async (req, res) => {
        try {
            const produtosPromocao = await Produto.findAll({ where: { promocao: true } });
            res.render('ofertas', { produtosPromocao });
        } catch (err) {
            res.status(500).send("Erro ao listar ofertas");
        }
    },

    // Página Sobre Nós
    sobreNos: (req, res) => {
        res.render('sobre');
    },

    // Página de Formulário de Adição de Produto (Para Vendedores)
    adicionarProduto: async (req, res) => {
        try {
            const categorias = await Produto.findAll({ attributes: ['categoria'] });
            res.render('adicionar-produto', { categorias });
        } catch (err) {
            res.status(500).send("Erro ao carregar categorias");
        }
    },

    // Adicionar produto ao banco de dados
    salvarProduto: async (req, res) => {
        const { nome, marca, descricao, preco, unidade, categoria, destaque, promocao } = req.body;
        try {
            await Produto.create({
                nome_produto: nome,
                marca,
                descricao,
                preco,
                unidade,
                categoria,
                destaque,
                promocao,
                imagem: req.file ? req.file.path : null
            });
            res.redirect('/produtos'); // Redireciona para a tela de produtos (ou qualquer outra que você prefira)
        } catch (err) {
            res.status(500).send("Erro ao adicionar produto");
        }
    }
};
