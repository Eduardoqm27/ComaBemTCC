const bcrypt = require("bcrypt");
const usuarios = require("../models/Usuario");

const authController = {
  login: async (req, res) => {
    const { email, senha } = req.body;
    try {
      const user = await usuarios.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(senha, user.senha))) {
        return res.render("index", { errorMessage: "Senha invalida!" });
      }

      req.session.userId = user.id;
      req.session.user = user;

      res.redirect("../user/perfil");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  cadastro: async (req, res) => {
    const { nome, datanasc, funcao, email, senha } = req.body;
    const userExists = await usuarios.findOne({ where: { email } });
    if (userExists) {
      return res.render("register", { errorMessage: "Email já cadastrado" });
    }
    const formatarData = (data) => {
      const date = new Date(data);
      if (isNaN(date)) {
        throw new Error("Data inválida");
      }
      const ano = date.getFullYear();
      const mes = String(date.getMonth() + 1).padStart(2, "0");
      const dia = String(date.getDate()).padStart(2, "0");
      return `${ano}-${mes}-${dia}`;
    };

    try {
      const datanascFormatada = formatarData(datanasc);

      try {
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const newUser = {
          nome,
          data_nasc: datanascFormatada,
          funcao,
          email,
          senha: senhaHash,
        };

        const createdUser = await usuarios.create(newUser);

        req.session.userId = createdUser.id;
        req.session.user = newUser;

        res.redirect("../user/perfil");
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    } catch (err) {
      return res.render("register", {
        errorMessage: "Data de nascimento inválida",
      });
    }
  },

  // Alterado: Função de logout
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // Após destruir a sessão, redireciona o usuário para o login
      res.redirect('/auth/login');
    });
  },

  checkSession: (req, res) => {
    if (req.session && req.session.userId) {
      res.status(200).json({
        isAuthenticated: true,
        userId: req.session.userId,
        userName: req.session.userName,
      });
    } else {
      res.status(200).json({ isAuthenticated: false });
    }
  },
};

module.exports = authController;
