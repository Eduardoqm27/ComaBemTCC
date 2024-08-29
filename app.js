const express = require('express');
const session = require('express-session');
const app = express();
const sequelize = require('./config/database');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'comabemsecret',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');

// Rotas
app.use('/', require('./routes/index')); // Ajuste aqui
app.use('/auth', require('./routes/auth'));
app.use('/carrinho', require('./routes/carrinho'));
app.use('/produto', require('./routes/produto'));

// Sincronizar DB e iniciar servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor está rodando em http://localhost:3000');
    });
});
