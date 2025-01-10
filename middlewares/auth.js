const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }

  return res.redirect('/auth/login');
};

const checkFuncao = (funcao) => {
  return (req, res, next) => {
    if (req.session && req.session.userId && req.user?.funcao === funcao) {
      return next();
    }

    res.redirect('/acesso-negado');
  };
};

module.exports = { requireAuth, checkFuncao };
