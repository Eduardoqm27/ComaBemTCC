const express = require('express');
const path = require('path');
const app = express();

// Configuração de views e pasta pública
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Importar e usar as rotas de produtos
const produtoRoutes = require('./routes/produto');
app.use('/produtos', produtoRoutes);

// Rotas para outras páginas
app.get('/', (req, res) => {
    res.render('pages/index'); // Agora 'pages/index' corresponde ao arquivo 'views/pages/index.ejs'
});

app.get('/sobre-nos', (req, res) => {
    res.render('pages/sobre-nos'); // Agora 'pages/sobre-nos' corresponde ao arquivo 'views/pages/sobre-nos.ejs'
});

// Outras rotas
app.get('/login', (req, res) => {
    res.render('auth/login'); // Certifique-se de que o arquivo 'login.ejs' está na pasta 'views/auth'
});

app.get('/cadastro', (req, res) => {
    res.render('auth/cadastro'); // Certifique-se de que o arquivo 'cadastro.ejs' está na pasta 'views/auth'
});

// Rotas para as páginas de categorias e carrinho
app.get('/verduras', (req, res) => {
    res.render('produtos/verduras'); // Certifique-se de que o arquivo 'verduras.ejs' está na pasta 'views/produtos/'
});

app.get('/legumes', (req, res) => {
    res.render('produtos/legumes'); // Certifique-se de que o arquivo 'legumes.ejs' está na pasta 'views/produtos/'
});

app.get('/frutas', (req, res) => {
    res.render('produtos/frutas'); // Certifique-se de que o arquivo 'frutas.ejs' está na pasta 'views/produtos/'
});

app.get('/kits', (req, res) => {
    res.render('produtos/kits'); // Certifique-se de que o arquivo 'kits.ejs' está na pasta 'views/produtos/'
});

app.get('/carrinho', (req, res) => {
    res.render('produtos/carrinho'); // Certifique-se de que o arquivo 'carrinho.ejs' está na pasta 'views/produtos/'
});


// Tratamento de erros
app.use((req, res, next) => {
    res.status(404).send('Página não encontrada');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});