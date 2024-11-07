const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('./config/passport-setup');
const flash = require('connect-flash');
const sequelize = require('./config/database');

// Importando os modelos
const Usuario = require('./models/Usuario');
const Produto = require('./models/Produto');
const Carrinho = require('./models/Carrinho');
const Pedido = require('./models/Pedido');
const Entrega = require('./models/Entrega');
const Entregador = require('./models/Entregador');
const Endereco = require('./models/Endereco');

// Importando as rotas
const authRoutes = require('./routes/auth');
const produtoRoutes = require('./routes/produto');
const carrinhoRoutes = require('./routes/carrinho');
const userRoutes = require('./routes/user');

const app = express();

// Configuração da sessão
app.use(session({
    secret: 'seu_segredo_aqui', // Certifique-se de alterar para algo seguro
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: sequelize })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware para mensagens flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Configuração do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rota para a página inicial
app.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { promocao: true } });
        res.render('index', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos em promoção:', error);
        res.status(500).send('Erro ao carregar a página inicial');
    }
});

// Definindo associações entre os modelos
const defineAssociations = () => {
    Usuario.associate({ Produto, Pedido, Entrega, Entregador, Endereco });
    Produto.associate({ Usuario, Pedido, Carrinho }); // Certifique-se de incluir Carrinho
    Pedido.associate({ Usuario, Entrega });
    Entrega.associate({ Pedido, Entregador });
    Entregador.associate({ Entrega });
    Endereco.associate({ Usuario });
};

defineAssociations();

// Rotas
app.use('/auth', authRoutes);
app.use('/produto', produtoRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/user', userRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Sincroniza os modelos e inicia o servidor
sequelize.sync({ alter: true })  // Altera a tabela se necessário
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida.');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = app;
