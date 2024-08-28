const express = require('express');
const router = express.Router();

// Adicione as rotas principais aqui
router.get('/', (req, res) => {
    res.redirect('/'); // Redireciona para a página principal dos produtos
});

module.exports = router;
