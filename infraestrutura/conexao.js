const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Zangrasfa0', //Senha so seu usuario root no database
    database: 'projetoPiFarmacia'  
});


module.exports = conexao;