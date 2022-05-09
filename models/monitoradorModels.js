const { conexao } = require("../infraestrutura/conexao");
const { conexaoAzure, sql } = require("../infraestrutura/conexaoAzure");

class MonitoradorModels {
  cadastrarMonitorador(req, res) {
    const { FK_Loja, Nome, CPF, Email, Senha } = req;
    const sql = `
         call SP_Cadastro_Monitorador(?, ?, ?, ?,?, @saida, @saida_Rotulo);`;
    conexao.query(
      sql,
      [FK_Loja, Nome, CPF, Email, Senha],
      async (error, results) => {
        if (error) {
          await res
            .status(500)
            .json({ ...error, Message: "Erro no servidor..." });
          return;
        }

        if ((await results[0][0].erro) == "ERROR1") {
          await res.status(400).json(results[0][0]);
          return;
        }

        if ((await results[0][0].erro) == "ERROR2") {
          await res.status(500).send(results);
          return;
        }

        await res.status(200).send(results[0][0]);
      }
    );
  }

  async cadastrarMonitoradorAzure(req, res) {
    const { FK_Loja, Nome, CPF, Email, Senha } = req;
    try {
      const pool = await conexaoAzure();
      pool
        .request()
        .input("FK_Loja", FK_Loja)
        .input("Nome", Nome)
        .input("CPF", CPF)
        .input("Email", Email)
        .input("Senha", Senha)
        .output("erro", sql.VarChar(20))
        .output("message", sql.VarChar(50))
        .execute("[dbo].[SP_Cadastro_Monitorador]", async (error, results) => {
          if (error) {
            return await res
              .status(500)
              .json({ ...error, Message: "Erro no servidor..." });
          }

          if ((await results.output.erro) == "ERROR2") {
            return res.status(500).json(results.output);
          }

          if ((await results.output.erro) == "ERROR1") {
            return res.status(404).json(results.output);
          }

          await res.status(201).json(results.output);
        });

    } catch (error) {
      throw new Error("Error" + error);
    }
  }
}

module.exports = new MonitoradorModels();
