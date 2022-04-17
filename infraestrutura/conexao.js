const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abaxiiionivurh90hr', //Senha so seu usuario root no database
    database: 'farmagraphsolutions'  
});


module.exports = conexao; 