const Produto = require('../models/Produto');

// Função para obter todos os produtos
exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.render('produto', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao buscar produtos');
    }
};

// Função para exibir o formulário de adição de produto
exports.getAddProdutoForm = (req, res) => {
    res.render('adicionar-produto');
};

// Função para adicionar um novo produto
exports.addProduto = async (req, res) => {
    try {
        const { nome_produto, categoria, descricao, preco, imagem } = req.body;
        await Produto.create({ nome_produto, categoria, descricao, preco, imagem });
        res.redirect('/produtos');
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).send('Erro ao adicionar produto');
    }
};

// Função para exibir o formulário de edição de produto
exports.getEditProdutoForm = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }
        res.render('editar-produto', { produto });
    } catch (error) {
        console.error('Erro ao buscar produto para edição:', error);
        res.status(500).send('Erro ao buscar produto para edição');
    }
};

// Função para editar um produto
exports.editProduto = async (req, res) => {
    try {
        const { nome_produto, categoria, descricao, preco, imagem } = req.body;
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }
        await produto.update({ nome_produto, categoria, descricao, preco, imagem });
        res.redirect('/produtos');
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        res.status(500).send('Erro ao editar produto');
    }
};

// Função para excluir um produto
exports.deleteProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }
        await produto.destroy();
        res.redirect('/produtos');
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).send('Erro ao excluir produto');
    }
};