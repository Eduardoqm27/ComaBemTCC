const Produto = require('../models/Produto');

exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.render('index', { produtos });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};

exports.getFrutas = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria: 'Fruta' } });
        res.render('index', { produtos });
    } catch (error) {
        console.error("Erro ao buscar frutas:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};

exports.getLegumes = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria: 'Legume' } });
        res.render('index', { produtos });
    } catch (error) {
        console.error("Erro ao buscar legumes:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};

exports.getVerduras = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria: 'Verdura' } });
        res.render('index', { produtos });
    } catch (error) {
        console.error("Erro ao buscar verduras:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};

exports.getKits = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria: 'Kit' } });
        res.render('index', { produtos });
    } catch (error) {
        console.error("Erro ao buscar kits:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};

exports.getProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (produto) {
            res.render('produto', { produto });
        } else {
            res.status(404).send('Produto não encontrado');
        }
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};