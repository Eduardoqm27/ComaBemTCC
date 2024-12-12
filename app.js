const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('./config/passport-setup');
const flash = require('connect-flash');
const sequelize = require('./config/database');
const expressLayouts = require('express-ejs-layouts');

const Produto = require('./models/Produto');
const Carrinho = require('./models/Carrinho');

const authRoutes = require('./routes/auth');
const produtoRoutes = require('./routes/produto');
const carrinhoRoutes = require('./routes/carrinho');
const userRoutes = require('./routes/user');
const mainRoutes = require('./routes/main');

const app = express();

app.use(
    session({
        secret: 'seu_segredo_aqui',
        resave: false,
        saveUninitialized: false,
        store: new SequelizeStore({ db: sequelize }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            secure: false,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Usando as rotas
app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/produto', produtoRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/user', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida.');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = app;
