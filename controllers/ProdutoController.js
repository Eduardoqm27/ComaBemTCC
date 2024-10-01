const Produto = require('../models/Produto');

module.exports = {
    listarProdutos: async (req, res) => {
        try {
            const produtos = await Produto.findAll(); // Obter todos os produtos
            const produtosPromocao = produtos.filter(produto => produto.promocao); // Filtrar produtos em promoção
            res.render('index', { produtos: produtosPromocao }); // Passar produtos em promoção para a view index
        } catch (err) {
            res.status(500).send("Erro ao listar produtos");
        }
    }
};
