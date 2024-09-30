function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { // Supondo que está usando uma biblioteca como Passport.js
        return next();
    }
    res.redirect('/user/login'); // Se não estiver logado, redireciona para a página de login
}

module.exports = { isAuthenticated };
