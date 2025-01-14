const Produto = require('../models/Produto');
const fs = require('fs');
const path = require('path');

// Listar Produtos
const listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ tableName: 'tbproduto' }); // Nome correto da tabela
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

        // Calcula preço com desconto, se aplicável
        if (desconto && desconto > 0) {
            preco_com_desconto = preco - (preco * (desconto / 100));
            promocao = true;
        }

        await Produto.create({
            nome_produto,
            descricao,
            preco,
            preco_com_desconto,
            categoria,
            imagem,
            promocao,
            desconto,
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
        const desconto = req.body.desconto || 0; // Se não informado, assume 0
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
        }

        let preco_com_desconto = preco;
        if (desconto > 0) {
            preco_com_desconto = preco - (preco * (desconto / 100));
        }

        if (req.file && produto.imagem) {
            fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', produto.imagem));
        }

        await produto.update({
            nome_produto,
            descricao,
            preco,
            categoria,
            imagem: req.file ? req.file.filename : produto.imagem,
            promocao: desconto > 0,
            preco_desconto: preco_com_desconto,
        });

        res.json({ sucesso: true, mensagem: 'Produto atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error.message);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao atualizar produto.' });
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
            const imagePath = path.join(__dirname, '..', 'public', 'uploads', produto.imagem);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await produto.destroy();
        res.json({ sucesso: true, mensagem: 'Produto excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir produto:', error.message);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao excluir produto.' });
    }
};




// Editar Produto
const editarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);

        if (!produto) return res.status(404).send('Produto não encontrado.');

        res.render('editar-produto', { produto });
    } catch (error) {
        console.error('Erro ao carregar página de edição:', error.message);
        res.status(500).send('Erro ao carregar página de edição.');
    }
};

module.exports = {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto,
    editarProduto,
};
