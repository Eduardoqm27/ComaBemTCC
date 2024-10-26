const Carrinho = require('../models/Carrinho');
const Produto = require('../models/Produto');

module.exports = {
    exibirCarrinho: async (req, res) => {
        try {
            const itens = await Carrinho.findAll({ include: Produto });
            console.log(itens); // Verificando os itens do carrinho

            // Calcular subtotal
            const subtotal = itens.reduce((total, item) => {
                return total + (item.Produto.preco * item.quantidade);
            }, 0);

            res.render('carrinho', { itens: itens || [], subtotal }); // Corrigindo a passagem de itens
        } catch (err) {
            console.error(err);
            res.render('carrinho', { itens: [], subtotal: 0 }); // Tratamento de erro
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
