const Produto = require('../models/Produto');

module.exports = {
    listarProdutos: async (req, res) => {
        try {
            const produtos = await Produto.findAll();
            res.render('/categoria', { produtos });
        } catch (err) {
            res.status(500).send("Erro ao listar produtos");
        }
    }
};