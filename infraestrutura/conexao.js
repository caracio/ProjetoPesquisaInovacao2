const mysql = require('mysql2');

const { config } = require("dotenv");

config();

const conexao =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:  'Zangrasfa',
    database: 'farmagraphsolutions'  
});


module.exports = {conexao}; 