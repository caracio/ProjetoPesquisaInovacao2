const sql = require("mssql");

const dbSettings = {
  user: "root",
  password: process.env.SENHA,
  server: "localhost",
  database: "farmagraphsolutions",
  parseJSON: true,
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const conexaoAzure = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { conexaoAzure, sql };
