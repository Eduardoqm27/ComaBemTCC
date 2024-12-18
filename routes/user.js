const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth');

// Página do usuário (somente acessível após login)
router.get('/perfil', requireAuth, async (req, res) => {
    try {
        const user = req.session.user || req.user;

        res.render('perfil', { user });
    } catch (error) {
        console.error('Erro ao carregar perfil do usuário:', error);
        res.status(500).send('Erro ao carregar o perfil do usuário.');
    }
});



module.exports = router;
