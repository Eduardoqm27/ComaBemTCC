const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./config/database');
const produtoRoutes = require('./routes/produto');
const indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/produtos', produtoRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log('Modelos sincronizados com o banco de dados');
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
}).catch(error => {
    console.error('Erro ao sincronizar os modelos com o banco de dados:', error);
});