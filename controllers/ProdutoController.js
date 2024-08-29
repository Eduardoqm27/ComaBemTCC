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

// Adicione métodos para cada categoria
exports.getFrutas = async (req, res) => {
    try {
        const frutas = await Produto.findAll({ where: { categoria: 'fruta' } });
        res.render('frutas', { produtos: frutas });
    } catch (error) {
        console.error("Erro ao buscar frutas:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};

exports.getLegumes = async (req, res) => {
    try {
        const legumes = await Produto.findAll({ where: { categoria: 'legume' } });
        res.render('legumes', { produtos: legumes });
    } catch (error) {
        console.error("Erro ao buscar legumes:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};

exports.getVerduras = async (req, res) => {
    try {
        const verduras = await Produto.findAll({ where: { categoria: 'verdura' } });
        res.render('verduras', { produtos: verduras });
    } catch (error) {
        console.error("Erro ao buscar verduras:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};

exports.getKits = async (req, res) => {
    try {
        const kits = await Produto.findAll({ where: { categoria: 'kit' } });
        res.render('kits', { produtos: kits });
    } catch (error) {
        console.error("Erro ao buscar kits:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};

exports.getProdutoById = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (produto) {
            res.render('produto', { produto });
        } else {
            res.status(404).send("Produto não encontrado");
        }
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};