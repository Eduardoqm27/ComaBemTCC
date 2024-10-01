const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario'); // Certifique-se de que o caminho esteja correto

// Configuração da estratégia local
passport.use(new LocalStrategy({
    usernameField: 'email', // O campo que será usado para login
    passwordField: 'senha'   // O campo que será usado para senha
}, async (email, senha, done) => {
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return done(null, false, { message: 'Usuário não encontrado.' });
        }

        const isMatch = await bcrypt.compare(senha, usuario.senha);
        if (!isMatch) {
            return done(null, false, { message: 'Senha incorreta.' });
        }

        return done(null, usuario);
    } catch (error) {
        return done(error);
    }
}));

// Serialização do usuário
passport.serializeUser((usuario, done) => {
    done(null, usuario.id); // Salva o ID do usuário na sessão
});

// Desserialização do usuário
passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await Usuario.findByPk(id);
        done(null, usuario);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
