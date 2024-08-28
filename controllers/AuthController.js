const Usuario = require('../models/Usuario');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email, senha } });
    if (usuario) {
        req.session.usuarioId = usuario.id;
        res.redirect('/');
    } else {
        res.send('Usuário ou senha incorretos');
    }
};

exports.getCadastro = (req, res) => {
    res.render('cadastro');
};

exports.postCadastro = async (req, res) => {
    const { nome, email, senha } = req.body;
    await Usuario.create({ nome, email, senha });
    res.redirect('/auth/login');
};