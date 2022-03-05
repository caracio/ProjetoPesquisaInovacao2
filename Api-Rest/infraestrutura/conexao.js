const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jinfi',
    database: 'projetoPiFarmacia'  
});


module.exports = conexao;