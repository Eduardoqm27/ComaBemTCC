function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

function checkRole(role) {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === role) return next();
        res.status(403).send('Acesso negado');
    };
}

module.exports = { checkAuthenticated, checkRole };
