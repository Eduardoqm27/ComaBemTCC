const Carrinho = require('../models/Carrinho');
const Produto = require('../models/Produto');

module.exports = {
    exibirCarrinho: async (req, res) => {
        try {
            const itens = await Carrinho.findAll({ include: Produto });
            res.render('carrinho', { itens });
        } catch (err) {
            res.status(500).send("Erro ao exibir carrinho");
        }
    },

    adicionarAoCarrinho: async (req, res) => {
        const produtoId = req.body.produtoId;

        try {
            await Carrinho.create({ produtoId });
            res.redirect('/carrinho');
        } catch (err) {
            res.status(500).send("Erro ao adicionar ao carrinho");
        }
    }
};
