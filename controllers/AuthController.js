const Usuario = require('../models/Usuario');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email, senha } });
        if (usuario) {
            req.session.usuarioId = usuario.id;
            res.redirect('/');
        } else {
            res.send('Usuário ou senha incorretos');
        }
    } catch (error) {
        console.error("Erro ao carregar a página:", error);
        res.status(500).send("Erro ao carregar a página");
    }
};

exports.getCadastro = (req, res) => {
    res.render('cadastro');
};

exports.postCadastro = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        await Usuario.create({ nome, email, senha });
        res.redirect('/auth/login');
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).send("Erro ao cadastrar usuário");
    }
};