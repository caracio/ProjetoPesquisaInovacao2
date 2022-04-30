const mysql = require('mysql2');
const sql = require('mssql');

const { config } = require("dotenv");

config();

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:  process.env.SENHA,
    database: 'farmagraphsolutions'  
});

const dbSettings = {
    user: "root",
    password: process.env.SENHA,
    server: "localhost",
    database: "farmagraphsolutions",
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };

 const conexaoAzure = async ()=>{
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (err) { 
    console.error(err);
  }
 }
  



module.exports = {conexao, conexaoAzure, sql}; 