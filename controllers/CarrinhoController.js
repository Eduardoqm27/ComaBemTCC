const Carrinho = require('../models/Carrinho');

// Função para adicionar produto ao carrinho
exports.addToCarrinho = async (req, res) => {
  try {
    const { produtoId, quantidade } = req.body;
    await Carrinho.create({ produtoId, quantidade });
    res.redirect('/carrinho');
  } catch (error) {
    console.error("Erro ao adicionar produto ao carrinho:", error);
    res.redirect('/');
  }
};