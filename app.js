const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');

// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração do EJS como motor de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuração para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Usar rotas
app.use('/user', userRoutes);

// Rota padrão para servir a página inicial
app.get('/', (req, res) => {
    res.render('index');  // Renderiza a página inicial
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
