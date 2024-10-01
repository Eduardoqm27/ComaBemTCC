const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

module.exports = {
    cadastro: async (req, res) => {
        const { nome, email, senha, data_nasc } = req.body;

        // Verificar se todos os campos estão presentes
        if (!nome || !email || !senha || !data_nasc) {
            return res.status(400).send("Todos os campos são obrigatórios.");
        }

        // Hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(senha, 10);

        try {
            await Usuario.create({ nome, email, senha: hashedPassword, data_nasc });
            res.redirect('/user/login');
        } catch (err) {
            console.error(err); // Adicionando log de erro para depuração
            res.status(500).send("Erro ao cadastrar usuário");
        }
    },

    login: async (req, res) => {
        const { email, senha } = req.body;

        try {
            const user = await Usuario.findOne({ where: { email } });
            if (user && await bcrypt.compare(senha, user.senha)) {
                req.session.userId = user.id; // Armazenar o ID do usuário na sessão
                res.redirect('/');  // Redireciona para a página principal após login
            } else {
                res.status(401).send("Usuário ou senha incorretos");
            }
        } catch (err) {
            console.error(err); // Adicionando log de erro para depuração
            res.status(500).send("Erro no login");
        }
    }
};
