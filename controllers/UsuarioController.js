const Usuario = require('../models/Usuario');

module.exports = {
    perfil: async (req, res) => {
        try {
            const userId = req.session.userId;
            const user = await Usuario.findByPk(userId);
            if (!user) {
                return res.status(404).send("Usuário não encontrado");
            }
            res.render('perfil', { user });
        } catch (err) {
            res.status(500).send("Erro ao carregar perfil");
        }
    },

    listarUsuarios: async (req, res) => {
        // Somente para vendedores
        if (req.session.tipo !== 'vendedor') {
            return res.status(403).send("Acesso negado");
        }

        try {
            const usuarios = await Usuario.findAll();
            res.render('usuarios-lista', { usuarios });
        } catch (err) {
            res.status(500).send("Erro ao listar usuários");
        }
    }
};
