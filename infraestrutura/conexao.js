const mysql = require('mysql2');

const { config } = require("dotenv");

config();

const conexao =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:  'umasenha',
    database: 'farmagraphsolutions'  
});


module.exports = {conexao}; 