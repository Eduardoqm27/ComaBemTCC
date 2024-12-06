const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const Usuario = require('../models/Usuario');
const { checkAuthenticated } = require('../middlewares/auth');

// Rota para criar um pedido
router.post('/criar', checkAuthenticated, async (req, res) => {
    const { total, pagto } = req.body;
    const usuarioId = req.session.userId || req.user.id;

    try {
        // Cria um novo pedido no banco de dados
        const novoPedido = await Pedido.create({
            data: new Date(),
            total,
            pagto,
            id_usuario: usuarioId
        });

        // Redireciona para a página de perfil do usuário após a criação do pedido
        res.redirect('/user/perfil');
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).send('Erro ao criar o pedido.');
    }
});

// Rota para exibir o histórico de pedidos do usuário
router.get('/historico', checkAuthenticated, async (req, res) => {
    const usuarioId = req.session.userId || req.user.id;

    try {
        const pedidos = await Pedido.findAll({
            where: { id_usuario: usuarioId }
        });
        res.render('historico', { pedidos });
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        res.status(500).send('Erro ao buscar pedidos.');
    }
});

module.exports = router;
