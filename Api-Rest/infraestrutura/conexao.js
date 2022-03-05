const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Planeta2011',
    database: 'projetoPiFarmacia'  
});


module.exports = conexao;