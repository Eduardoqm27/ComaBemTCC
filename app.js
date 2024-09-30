const express = require('express');
const path = require('path');
const sequelize = require('./config/database');

// Importando os modelos
const Usuario = require('./models/Usuario');
const Produto = require('./models/Produto');
const Pedido = require('./models/Pedido');
const Entrega = require('./models/Entrega');
const Entregador = require('./models/Entregador');
const Endereco = require('./models/Endereco'); // Certifique-se de importar todos os modelosconst userRoutes = require('./routes/user');

app.use('/user', userRoutes);


// Importando as rotas
const authRoutes = require('./routes/auth');
const produtoRoutes = require('./routes/produto');
const carrinhoRoutes = require('./routes/carrinho');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Definindo associações
const defineAssociations = (models) => {
    Usuario.associate(models);
    Produto.associate(models);
    Pedido.associate(models);
    Entrega.associate(models);
    Entregador.associate(models);
    Endereco.associate(models); // Certifique-se de que Endereco também é associado
};

// Rotas
app.use('/user', authRoutes);
app.use('/produto', produtoRoutes); // Alterando para '/produto'
app.use('/carrinho', carrinhoRoutes); // Especificando a rota

// Sincroniza os modelos e inicia o servidor
sequelize.sync()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida.');
        
        // Definindo associações após a sincronização
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