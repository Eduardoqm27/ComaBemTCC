const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

module.exports = {
    cadastro: async (req, res) => {
        const { nome, email, senha, data_nasc, tipo } = req.body; // Adicionando tipo

        // Verificar se todos os campos estão presentes
        if (!nome || !email || !senha || !data_nasc || !tipo) {
            return res.status(400).send("Todos os campos são obrigatórios.");
        }

        // Hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(senha, 10);

        try {
            await Usuario.create({ nome, email, senha: hashedPassword, data_nasc, tipo });
            res.redirect('/auth/login');
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
                req.session.tipo = user.tipo; // Armazenar o tipo de usuário (vendedor ou cliente)
                res.redirect('/user/perfil');  // Redireciona para a página de perfil após login
            } else {
                res.status(401).send("Usuário ou senha incorretos");
            }
        } catch (err) {
            console.error(err); // Adicionando log de erro para depuração
            res.status(500).send("Erro no login");
        }
    }
};