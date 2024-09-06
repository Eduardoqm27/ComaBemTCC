const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha', //IF - aluno01 casa - &du4rdoQuart27
    database: 'ComaBem'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados ComaBem');
});

module.exports = connection;
