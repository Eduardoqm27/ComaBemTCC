const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    }
    return res.status(401).json({ message: 'Usuário não autenticado' });
  };
  
function checkFuncao(role) {
    return (req, res, next) => {
        if (req.session && req.session.userId && req.user.funcao === funcao) return next();
        res.status(403).send('Acesso negado');
    };
}

module.exports = { requireAuth, checkFuncao };
