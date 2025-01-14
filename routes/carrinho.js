const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const Carrinho = require('../models/Carrinho');
const methodOverride = require('method-override');

// Middleware para sobrescrever métodos HTTP
router.use(methodOverride('_method'));

// Middleware para obter o usuário da sessão e disponibilizá-lo nas views
router.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Rota para exibir o carrinho
router.get('/', async (req, res) => {
    try {
        const carrinho = req.session.carrinho || [];
        
        if (carrinho.length === 0) {
            // Caso o carrinho esteja vazio na sessão, buscar do banco
            const itensCarrinho = await Carrinho.findAll({
                include: {
                    model: Produto,
                    as: 'produto',
                    attributes: ['id_produto', 'nome_produto', 'preco', 'imagem']
                }
            });
            
            itensCarrinho.forEach(item => {
                carrinho.push({
                    id: item.id,
                    produtoId: item.produto.id_produto,
                    nome_produto: item.produto.nome_produto,
                    preco: item.produto.preco,
                    imagem: item.produto.imagem,
                    quantidade: item.quantidade,
                });
            });
            req.session.carrinho = carrinho;
        }

        const subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

        res.render('carrinho', { carrinho, subtotal });
    } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
        res.status(500).send('Erro ao carregar o carrinho');
    }
});

// Rota para adicionar produto ao carrinho
router.post('/adicionar', async (req, res) => {
    try {
        let { produtoId } = req.body;
        produtoId = parseInt(produtoId, 10);

        if (isNaN(produtoId) || produtoId <= 0) {
            return res.status(400).json({ error: 'ID do produto inválido.' });
        }

        const produto = await Produto.findByPk(produtoId);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        let carrinho = req.session.carrinho || [];
        const itemExistente = carrinho.find(item => item.produtoId === produtoId);

        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({
                produtoId,
                nome_produto: produto.nome_produto,
                preco: produto.preco,
                imagem: produto.imagem,
                quantidade: 1
            });
        }

        req.session.carrinho = carrinho;

        await Carrinho.create({ produtoId, quantidade: 1 });
        res.redirect('/carrinho');
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        res.status(500).send('Erro ao adicionar produto ao carrinho');
    }
});

// Rota para editar a quantidade de um item no carrinho
router.put('/editar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;

        const carrinhoItem = req.session.carrinho.find(item => item.produtoId === parseInt(id));
        if (!carrinhoItem) {
            return res.status(404).send('Item não encontrado no carrinho');
        }

        carrinhoItem.quantidade = parseInt(quantidade, 10);

        await Carrinho.update({ quantidade: carrinhoItem.quantidade }, { where: { produtoId: id } });

        res.redirect('/carrinho');
    } catch (error) {
        console.error('Erro ao editar produto no carrinho:', error);
        res.status(500).send('Erro ao editar produto no carrinho');
    }
});

// Rota para limpar o carrinho
router.delete('/limpar', async (req, res) => {
    try {
        // Limpar os itens do carrinho no banco de dados
        await Carrinho.destroy({ where: {} });

        // Redirecionar para o carrinho vazio
        res.redirect('/carrinho');
    } catch (error) {
        console.error('Erro ao limpar o carrinho:', error);
        res.status(500).send('Erro ao limpar o carrinho');
    }
});



// Rota para finalizar a compra
router.post('/finalizar', async (req, res) => {
    try {
        const itensCarrinho = await Carrinho.findAll({
            include: { model: Produto, as: 'produto' }
        });

        if (!itensCarrinho.length) {
            return res.status(400).send('Carrinho vazio.');
        }

        const total = itensCarrinho.reduce((acc, item) => {
            return acc + item.quantidade * item.produto.preco;
        }, 0);

        // Limpar o carrinho após a compra
        await Carrinho.destroy({ where: {} });

        // Também limpar o carrinho da sessão
        req.session.carrinho = [];

        res.send(`Compra finalizada com sucesso! Total: R$ ${total.toFixed(2)}`);
    } catch (error) {
        console.error('Erro ao finalizar compra:', error);
        res.status(500).send('Erro ao finalizar compra');
    }
});


module.exports = router;