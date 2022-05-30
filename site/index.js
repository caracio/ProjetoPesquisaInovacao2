const customExpress = require("./src/config/customExpress");
const app = customExpress();
const { conexao } = require("./src/infraestrutura/conexao");
const { conexaoAzure } = require("./src/infraestrutura/conexaoAzure");
const Tabelas = require("./src/infraestrutura/tabelas");

try {
  conexaoAzure();
  console.log("Connected Sql Server");
  conexao.connect((err) => {
    if (!err) {
      console.log("\nConnected Mysql");
      Tabelas.init(conexao);
    }
  });
  
  app.listen(3000, () => console.log("Estamos rodando na Porta 3000"));
} catch (error) {
  console.log("houve um erro ao conectar com o" + error);
}
