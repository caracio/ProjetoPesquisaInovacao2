const { conexao } = require("../infraestrutura/conexao");
const { conexaoAzure, sql } = require("../infraestrutura/conexaoAzure");

class ResponsavelModels {
  cadastrarResponsavel(req, res) {
    const sql = `CALL SP_Cadastro_Responsavel( ?, ?, ?,@saida,@saida_Rotulo);`;

    conexao.query(
      sql,
      [req.Nome, req.Email, req.Senha],
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

  async cadastrarResponsavelAzure(req, res) {
    try {
      const pool = await conexaoAzure();
      pool
        .request()
        .input("Nome", req.Nome)
        .input("Email", req.Email)
        .input("Senha", req.Senha)
        .output("erro", sql.VarChar(20))
        .output("message", sql.VarChar(50))
        .execute("dbo.SP_Cadastro_Responsavel", async (error, results) => {
          if (error) {
            return await res
              .status(500)
              .json({ ...error, Message: "Erro no servidor..." });
          }

          if (await results.output.erro == "ERROR1"){
            return res.status(404).json(results.output);
          }

          await res.status(201).json(results.output);
        });
    } catch (error) {
      throw new Error("Erro:" + error);
    }
  }
}

module.exports = new ResponsavelModels();
