const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');
const multer = require('multer');
const path = require('path');

// Configuração do multer para o upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

// Função utilitária para validar dados obrigatórios
const validarCamposObrigatorios = (campos) => {
    for (const [campo, valor] of Object.entries(campos)) {
        if (!valor) return `${campo} é obrigatório.`;
    }
    return null;
};

// Método para criar um novo produto
const criarProduto = async (req, res) => {
    try {
        const { nome, descricao, preco, categoriaId, promocao, porcentagemPromocao, destaque } = req.body;
        const imagem = req.file ? req.file.filename : null;

        // Validação de campos obrigatórios
        const erroValidacao = validarCamposObrigatorios({ nome, descricao, preco, categoriaId });
        if (erroValidacao) {
            return res.status(400).json({ error: erroValidacao });
        }

        // Verificando se a categoria existe
        const categoria = await Categoria.findByPk(categoriaId);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada.' });
        }

        // Criando o novo produto
        const produto = await Produto.create({
            nome,
            descricao,
            preco,
            imagem,
            categoriaId,
            promocao: promocao || false,
            destaque: destaque || false,
            porcentagemPromocao: promocao ? porcentagemPromocao || 0 : 0
        });

        return res.status(201).json(produto);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Método para listar todos os produtos
const listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            include: [{ model: Categoria }]
        });

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Método para listar produtos por categoria
const listarProdutosPorCategoria = async (req, res) => {
    try {
        const { categoriaId } = req.params;
        const produtos = await Produto.findAll({
            where: { categoriaId },
            include: [{ model: Categoria }]
        });

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Método para listar os produtos em promoção
const listarProdutosPromocao = async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            where: { promocao: true },
            include: [{ model: Categoria }]
        });

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Método para exibir detalhes de um produto
const mostrarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id, {
            include: [{ model: Categoria }]
        });

        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        return res.status(200).json(produto);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Método para atualizar os dados de um produto
const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, preco, categoriaId, promocao, porcentagemPromocao, destaque } = req.body;
        const imagem = req.file ? req.file.filename : null;

        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        // Atualizando os dados do produto
        await produto.update({
            nome: nome || produto.nome,
            descricao: descricao || produto.descricao,
            preco: preco || produto.preco,
            imagem: imagem || produto.imagem,
            categoriaId: categoriaId || produto.categoriaId,
            promocao: promocao !== undefined ? promocao : produto.promocao,
            destaque: destaque !== undefined ? destaque : produto.destaque,
            porcentagemPromocao: promocao ? porcentagemPromocao || produto.porcentagemPromocao : 0
        });

        return res.status(200).json(produto);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    criarProduto,
    listarProdutos,
    listarProdutosPorCategoria,
    listarProdutosPromocao,
    mostrarProduto,
    atualizarProduto
};
