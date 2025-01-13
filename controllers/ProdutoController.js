const Produto = require('../models/Produto');
const fs = require('fs');
const path = require('path');

// Listar Produtos
const listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        const categorias = {
            kits: produtos.filter(produto => produto.categoria === 'kits'),
            verduras: produtos.filter(produto => produto.categoria === 'verdura'),
            vegetais: produtos.filter(produto => produto.categoria === 'vegetais'),
            frutas: produtos.filter(produto => produto.categoria === 'fruta'),
        };
        res.render('produtos', { categorias });
    } catch (error) {
        console.error('Erro ao listar produtos:', error.message);
        res.status(500).render('produtos', { categorias: {} });
    }
};

// Criar Produto
const criarProduto = async (req, res) => {
    try {
        const { nome_produto, descricao, preco, categoria, desconto } = req.body;
        const imagem = req.file ? req.file.filename : null;

        let preco_com_desconto = preco;
        let promocao = false;

        // Se houver desconto, calcula o preço com o desconto
        if (desconto && desconto > 0) {
            preco_com_desconto = preco - (preco * (desconto / 100));
            promocao = true; // Marca o produto como promoção
        }

        await Produto.create({
            nome_produto,
            descricao,
            preco,
            preco_com_desconto,  // Armazena o preço com desconto
            categoria,
            imagem,
            promocao,  // Marca o produto como em promoção
            desconto,  // Armazena o valor do desconto
        });

        res.redirect('/produtos');
    } catch (error) {
        console.error('Erro ao criar produto:', error.message);
        res.status(500).json({ erro: 'Erro ao criar produto.' });
    }
};


// Atualizar Produto
const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_produto, descricao, preco, categoria } = req.body;
        const imagem = req.file ? req.file.filename : undefined;
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
        }

        if (imagem && produto.imagem) {
            fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', produto.imagem));
        }

        await produto.update({ nome_produto, descricao, preco, categoria, ...(imagem && { imagem }) });
        res.json({ sucesso: true });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error.message);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar produto.' });
    }
};

// Excluir Produto
const excluirProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
        }

        if (produto.imagem) {
            fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', produto.imagem));
        }

        await produto.destroy();
        res.json({ sucesso: true });
    } catch (error) {
        console.error('Erro ao excluir produto:', error.message);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir produto.' });
    }
};

// Editar Produto
const editarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
        }

        res.render('editar-produto', { produto });
    } catch (error) {
        console.error('Erro ao editar produto:', error.message);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao editar produto.' });
    }
};

module.exports = {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto,
    editarProduto,
};
