const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth'); // Adicione esta linha
const { Sequelize } = require('sequelize');

// Configuração do Sequelize com SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Teste de conexão
sequelize.authenticate().then(() => {
    console.log('Conectado ao banco de dados com sucesso.');
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
});

// Configuração do middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do motor de template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuração das rotas
app.use('/', indexRouter);
app.use('/auth', authRouter); // Adicione esta linha

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});