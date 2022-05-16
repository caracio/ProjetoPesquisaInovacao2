const sql = require("mssql");

const dbSettings = {
  user: "adminProjeto",
  password: "2ads$grupo2",
  server: "farmagraphsolutions.database.windows.net",
  database: "farmagraphsolutions",
  parseJSON: true,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const conexaoAzure = async () => {
  try {
    const  pool = await sql.connect(dbSettings);
    return pool;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { conexaoAzure, sql };
