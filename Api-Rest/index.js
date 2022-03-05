const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require('./infraestrutura/tabelas');

conexao.connect((err) => {
  if (err) {
     console.log("error connecting " + err.stack);
    return;
  }
  console.log("connected");

  Tabelas.init(conexao);

  const app = customExpress();
  
  app.listen(3000, () => console.log("Estamos rodando na Porta 3000"));
});
