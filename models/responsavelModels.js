const res = require("express/lib/response");
const conexao = require("../infraestrutura/conexao");

class ResponsavelModels {
  cadastrarResponsavel(req, res) {
    const sql = `CALL SP_Cadastro_Responsavel( ?, ?, ?,@saida,@saida_Rotulo);`;

    conexao.query(
      sql,
      [req.Nome, req.Email, req.Senha],
      async (error, results) => {
        if (error) {
          await res
            .status(400)
            .json({ ...error, Message: "Cheque os campo novamente..." });
          return;
        }

        if ((await results[0][0].saida) == "Este email já esta cadastrado!") {
          await res.status(422).send(results);
          return;
        }

        res.status(200).send({
          ...results,
          Message: "Responsavel cadastrado com sucesso!!! ",
        });
      }
    );
  }

  loginResponsavel(req, res) {
    const sql = `call SP_Login_Responsavel(?,?, @saida)`;

    conexao.query(sql, [req.Email, req.Senha], async (error, results) => {
      if (error) {
        await res.status(500).send(results);
        return;
      }
      console.log(results);
      if ((await results.affectedRows) == 0) {
        res
          .status(404)
          .send({ ...results, Message: "Login ou Senha incorretos!!!" });
        return;
      }

      await res.status(202).json(results);
    });
  }
}

module.exports = new ResponsavelModels();
