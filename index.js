const customExpress = require("./config/customExpress");
const app = customExpress();
const { conexao, conexaoAzure } = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");

try {
  conexaoAzure();
  conexao.connect();

  Tabelas.init(conexao);

  console.log("\nconnected sql server");
  console.log("Connected mysql\n");

  app.listen(3000, () => console.log("Estamos rodando na Porta 3000"));

} catch (error) {
  console.log("houve um erro ao conectar com o" + error);
}
