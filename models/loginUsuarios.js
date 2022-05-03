const { conexao } = require("../infraestrutura/conexao");
const { conexaoAzure, sql } = require("../infraestrutura/conexaoAzure");

class LoginUsuarios {
  Login(req, res) {
    const { Email, Senha } = req;
    const sql = `call SP_Login_Responsavel_Monitorador(?, ?,@saida,@saida_rotulo);`;

    conexao.query(sql, [Email, Senha], async (error, results) => {
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

      await res.status(200).json(results[0][0].usuario);
    });
  }

  async LoginAzure(req, res) {
    try {
      const pool = await conexaoAzure();
      const results = await pool.request().query(`SELECT * FROM Responsavel;`)
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LoginUsuarios();
