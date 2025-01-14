const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const sequelize = require('./config/database');

// Importação dos modelos
const Produto = require('./models/Produto');
const Carrinho = require('./models/Carrinho');

// Importação das rotas
const authRoutes = require('./routes/auth');
const produtoRoutes = require('./routes/produto');
const carrinhoRoutes = require('./routes/carrinho');
const userRoutes = require('./routes/user');
const mainRoutes = require('./routes/main');

const app = express();

// Configuração da sessão
app.use(
    session({
        secret: 'seu_segredo_aqui', // Substitua por uma chave segura
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 24 horas
            secure: false, // Mude para true em produção (HTTPS)
        },
    })
);

// Middleware para mensagens flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.session.user || null; // Usuário global para views
    next();
});

// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Registro das rotas
app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/produto', produtoRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/user', userRoutes);

// Middleware para tratar erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado! Por favor, tente novamente.');
});

// Conexão com o banco de dados e inicialização do servidor
sequelize
    .sync({ alter: true }) // Atualiza o banco de dados conforme os modelos
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida.');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000.');
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

module.exports = app;
