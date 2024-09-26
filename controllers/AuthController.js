const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

module.exports = {
    cadastro: async (req, res) => {
        const { nome, email, senha, data_nasc } = req.body;

        // Hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(senha, 10);
        
        try {
            await Usuario.create({ nome, email, senha: hashedPassword, data_nasc });
            res.redirect('/user/login');
        } catch (err) {
            res.status(500).send("Erro ao cadastrar usuário");
        }
    },

    login: async (req, res) => {
        const { email, senha } = req.body;

        try {
            const user = await Usuario.findOne({ where: { email } });
            if (user && await bcrypt.compare(senha, user.senha)) {
                res.redirect('/');  // Redireciona para a página principal após login
            } else {
                res.status(401).send("Usuário ou senha incorretos");
            }
        } catch (err) {
            res.status(500).send("Erro no login");
        }
    }
};