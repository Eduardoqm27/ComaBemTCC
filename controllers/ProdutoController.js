const Produto = require('../models/Produto');
const { Op } = require('sequelize');

module.exports = {
    listarProdutos: async (req, res) => {
        try {
            const produtos = await Produto.findAll();
            const produtosPromocao = produtos.filter(produto => produto.promocao);
            res.render('index', { produtos: produtosPromocao });
        } catch (err) {
            res.status(500).send("Erro ao listar produtos");
        }
    },

    // Função de pesquisa de produtos
    pesquisarProdutos: async (req, res) => {
        const { termo } = req.query;
        try {
            const produtos = await Produto.findAll({
                where: {
                    nome_produto: { [Op.like]: `%${termo}%` }
                }
            });
            res.json(produtos); // Retorna os produtos encontrados como JSON
        } catch (err) {
            console.error("Erro na pesquisa:", err);
            res.status(500).json({ error: "Erro ao buscar produtos" });
        }
    },

    // Função para obter detalhes do produto
    detalhesProduto: async (req, res) => {
        const { id } = req.params;
        try {
            const produto = await Produto.findByPk(id);
            if (!produto) {
                return res.status(404).send("Produto não encontrado");
            }
            res.render('produto-detalhe', { produto });
        } catch (err) {
            console.error("Erro ao obter detalhes do produto:", err);
            res.status(500).send("Erro ao obter detalhes do produto");
        }
    }
};
