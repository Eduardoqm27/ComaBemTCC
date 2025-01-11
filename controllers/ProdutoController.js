const Produto = require('../models/Produto');
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

// Função utilitária para validar campos obrigatórios
const validarCamposObrigatorios = (campos) => {
    for (const [campo, valor] of Object.entries(campos)) {
        if (!valor) return `${campo} é obrigatório.`;
    }
    return null;
};

// Função para criar produto
const criarProduto = async (req, res) => {
    try {
        const { nome_produto, descricao, preco, categoria } = req.body;

        // Validar campos obrigatórios
        const erro = validarCamposObrigatorios({ nome_produto, descricao, preco, categoria });
        if (erro) return res.status(400).send(erro);

        // Criar novo produto
        const novoProduto = await Produto.create({
            nome_produto,
            descricao,
            preco,
            categoria,
            imagem: req.file ? req.file.filename : null, // Salva a imagem se houver
            promocao: req.body.promocao === 'on',
            destaque: req.body.destaque === 'on',
        });

        res.redirect('/categoria'); // Redireciona para a categoria após a criação
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).send('Erro ao criar produto.');
    }
};

// Função para editar produto
const editarProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }
        res.render('editar-produto', { produto });  // Renderiza a página de edição
    } catch (error) {
        console.error('Erro ao carregar produto para edição:', error);
        res.status(500).send('Erro ao carregar produto para edição.');
    }
};

// Função para atualizar produto
const atualizarProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }

        // Atualizando produto com novos valores
        await produto.update({
            nome_produto: req.body.nome_produto,
            descricao: req.body.descricao,
            preco: req.body.preco,
            categoria: req.body.categoria,
            imagem: req.file ? req.file.filename : produto.imagem, // Se imagem foi enviada, atualiza
            promocao: req.body.promocao === 'on',
            destaque: req.body.destaque === 'on',
        });

        res.redirect('/categoria'); // Redireciona para a categoria após atualização
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).send('Erro ao atualizar produto.');
    }
};

// Função para deletar produto
const deletarProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }
        await produto.destroy();
        // Após a exclusão, redireciona de volta para a página de edição
        res.redirect(`/editar-produto/${req.params.id}`);
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).send('Erro ao deletar produto.');
    }
};

// Funções para listar produtos por categoria
const listarProdutosPorCategoria = async (categoria, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria } });
        res.render('categoria', { produtos });
    } catch (error) {
        res.status(500).send(`Erro ao listar produtos da categoria ${categoria}.`);
    }
};

// Função para listar vegetais
const listarVegetais = (req, res) => listarProdutosPorCategoria('Vegetais', res);

// Função para listar kits
const listarKits = (req, res) => listarProdutosPorCategoria('Kits', res);

// Função para listar ofertas
const listarOfertas = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { promocao: true } });
        res.render('ofertas', { produtos });
    } catch (error) {
        res.status(500).send('Erro ao listar ofertas.');
    }
};

// Função para exibir o formulário de adicionar produto
const formularioAdicionarProduto = (req, res) => {
    res.render('adicionar-produto');
};

module.exports = {
    criarProduto,
    editarProduto,
    atualizarProduto,
    deletarProduto,
    listarVegetais,
    listarKits,
    listarOfertas,
    formularioAdicionarProduto
};
