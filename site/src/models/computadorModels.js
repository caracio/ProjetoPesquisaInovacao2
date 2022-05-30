const { conexaoAzure, sql } = require("../infraestrutura/conexaoAzure");

class ComputadorModel {
  async cadastroComputador(req, res) {
    const pool = await conexaoAzure();
    pool
      .request()
      .input("ID_Computador", req.id_Computador)
      .input("Senha", req.senha)
      .input("FK_Loja", req.fk_Loja)
      .output("erro", sql.VarChar(20))
      .output("message", sql.VarChar(100))
      .execute("dbo.SP_Cadastro_Computador", async (error, results) => {
        if (error) {
          return res
            .status(500)
            .json({ ...error, Message: "Erro no servidor..." });
        }
        if ((await results.output.erro) == "ERROR1") {
          return res.status(500).json(results.output);
        }

        return res.status(200).json(results.output);
      });
  }
}

module.exports = new ComputadorModel();

