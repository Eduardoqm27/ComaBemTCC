const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('./config/passport-setup'); // Importa a configuração do Passport
const flash = require('connect-flash'); // Adiciona o connect-flash
const sequelize = require('./config/database');

// Importando os modelos
const Usuario = require('./models/Usuario');
const Produto = require('./models/Produto');
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
const sessionMiddleware = session({
    secret: 'seu_segredo_aqui',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
});

app.use(sessionMiddleware); // Adiciona o middleware de sessão ao app
app.use(passport.initialize()); // Inicializa o Passport
app.use(passport.session()); // Usar sessões do Passport

// Middleware para flash messages
app.use(flash());

// Middleware para tornar as mensagens flash disponíveis em todas as views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rota para a página inicial
app.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            where: { promocao: true }
        });
        res.render('index', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos em promoção:', error);
        res.status(500).send('Erro ao carregar a página inicial');
    }
});

// Definindo associações
const defineAssociations = (models) => {
    Usuario.associate(models);
    Produto.associate(models);
    Pedido.associate(models);
    Entrega.associate(models);
    Entregador.associate(models);
    Endereco.associate(models);
};

// Rotas
app.use('/auth', authRoutes);
app.use('/produto', produtoRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/user', userRoutes);

// Sincroniza os modelos e inicia o servidor
sequelize.sync()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida.');
        
        const models = {
            Usuario,
            Produto,
            Pedido,
            Entrega,
            Entregador,
            Endereco,
        };
        defineAssociations(models);
        
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));
