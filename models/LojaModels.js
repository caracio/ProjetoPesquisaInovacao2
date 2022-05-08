const {conexao} = require("../infraestrutura/conexao");
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
          console.log("Servidor 1")
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
            console.log("Servidor")
          await res.status(500).send(results);
          return;
        }

        await res.status(200).send(results[0][0]);
      }
    );
  }
}

module.exports = new LojaModels();
