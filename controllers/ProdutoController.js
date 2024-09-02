const { Op } = require('sequelize');
const Produto = require('../models/Produto');


// Função para obter todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.render('index', { produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).send('Erro ao buscar produtos');
  }
};

// Função para obter produto por ID
exports.getProdutoById = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) {
      res.render('produto', { produto });
    } else {
      res.status(404).send('Produto não encontrado');
    }
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).send('Erro ao buscar produto');
  }
};

// Função para obter produtos por categoria
exports.getProdutosPorCategoria = async (req, res) => {
  try {
    const produtos = await Produto.findAll({ where: { categoria: req.params.categoria } });
    res.render('index', { produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    res.status(500).send('Erro ao buscar produtos por categoria');
  }
};

// Função para pesquisar produtos
exports.searchProdutos = async (req, res) => {
  try {
    const query = req.query.query;
    const produtos = await Produto.findAll({
      where: {
        nome: {
          [Op.like]: `%${query}%`
        }
      }
    });
    res.render('index', { produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).send('Erro ao buscar produtos');
  }
};

exports.addProduto = async (req, res) => {
    try {
        const { nome, categoria, descricao, preco, imagem } = req.body;
        await Produto.create({ nome, categoria, descricao, preco, imagem });
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).send('Erro ao adicionar produto');
    }
};
