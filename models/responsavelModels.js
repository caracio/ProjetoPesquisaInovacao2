const {conexao} = require("../infraestrutura/conexao");

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

}

module.exports = new ResponsavelModels();
