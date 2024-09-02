const Usuario = require('../models/Usuario');

// Função para registrar um novo usuário
exports.postCadastro = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    await Usuario.create({ nome, email, senha });
    res.redirect('/login');
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.redirect('/cadastro');
  }
};

// Função para login (implementação de autenticação necessária)
exports.postLogin = async (req, res) => {
  try {
    const { email, senha } = req.body;
    // Implementar lógica de autenticação aqui
    res.redirect('/');
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.redirect('/login');
  }
};