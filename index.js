const customExpress = require("./config/customExpress");
const app = customExpress();
const { conexao } = require("./infraestrutura/conexao");
const { conexaoAzure } = require("./infraestrutura/conexaoAzure");
const Tabelas = require("./infraestrutura/tabelas");

try {
  conexaoAzure();
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
