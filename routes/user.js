const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth');

router.get('/perfil', requireAuth, (req, res) => {
    const user = req.session.user || req.user; 
    res.render('perfil', { user });
});

module.exports = router;
