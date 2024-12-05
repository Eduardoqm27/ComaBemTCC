const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

passport.use(new LocalStrategy({
    usernameField: 'email',  // Campo para login
    passwordField: 'senha'   // Campo para senha
}, async (email, senha, done) => {
    try {
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return done(null, false, { message: 'Usuário não encontrado' });
        }

        // Verifica se a senha fornecida corresponde à senha criptografada no banco
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return done(null, false, { message: 'Senha incorreta' });
        }

        return done(null, user);  // Usuário autenticado com sucesso
    } catch (err) {
        return done(err);  // Caso algum erro ocorra durante a busca ou comparação
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);  // Guarda o ID do usuário na sessão
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Usuario.findByPk(id);
        done(null, user);  // Deserializa o usuário usando o ID da sessão
    } catch (error) {
        done(error);  // Caso ocorra um erro ao recuperar o usuário
    }
});

module.exports = passport;
