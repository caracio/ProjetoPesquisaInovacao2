const { conexao } = require("../infraestrutura/conexao");
const { conexaoAzure, sql } = require("../infraestrutura/conexaoAzure");

const { config } = require("dotenv");
config();

class LojaModels {
  cadastrarLoja(req, res) {
    const sql = `call SP_Cadastro_Loja(?, ?, ?, ?, ?, ?, ?, ?, ?,@erro ,@message);`;

    conexao.query(
      sql,
      [
        req.ID_Responsavel,
        req.Nome,
        req.CNPJ,
        req.CEP,
        req.Estado,
        req.Cidade,
        req.Bairro,
        req.Rua,
        req.Numero,
      ],
      async (error, results) => {
        if (error) {
          await res
            .status(500)
            .json({ ...error, Message: "Erro no servidor..." });
          return;
        }

        if ((await results[0][0].erro) == process.env.USUARIOERROR) {
          await res.status(400).json(results[0][0]);
          return;
        }

        if ((await results[0][0].erro) == process.env.SERVIDORERROR) {
          console.log("Servidor");
          await res.status(500).send(results);
          return;
        }

        await res.status(200).send(results[0][0]);
      }
    );
  }

  async cadastrarLojaAzure(req, res) {
    const {
      ID_Responsavel,
      Nome,
      CNPJ,
      CEP,
      Estado,
      Cidade,
      Bairro,
      Rua,
      Numero,
    } = req;

    const pool = await conexaoAzure();
    pool
      .request()
      .input("FK_Responsavel", ID_Responsavel)
      .input("Nome", Nome)
      .input("CNPJ", CNPJ)
      .input("CEP", CEP)
      .input("Estado", Estado)
      .input("Cidade", Cidade)
      .input("Bairro", Bairro)
      .input("Rua", Rua)
      .input("Numero", Numero)
      .output("erro", sql.VarChar(40))
      .output("message", sql.VarChar(40))
      .execute("dbo.SP_Cadastro_Loja", async (error, results) => {
        if (error) {
          return await res
            .status(500)
            .json({ ...error, Message: "Erro no servidor..." });
        }

        if ((await results.output.erro) == "ERROR2") {
          return res.status(500).json(results.output);
        }

        if ((await results.output.erro) == "ERROR1") {
          return res.status(401).json(results.output);
        }

        res.status(200).json(results.output);
      });
  }
}

module.exports = new LojaModels();
