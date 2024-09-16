const User = require('../models/UserModel');

const UserController = {
    login: (req, res) => {
        const { nome, senha } = req.body;

        User.findByName(nome, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!user) {
                return res.status(401).send('Nome ou senha incorretos');
            }

            // Verificação direta da senha em texto simples
            if (user.senha !== senha) {
                return res.status(401).send('Nome ou senha incorretos');
            }

            // Redireciona para a página inicial após login bem-sucedido
            res.redirect('/dashboard');  // Ajuste a URL conforme necessário
        });
    }
};

module.exports = UserController;