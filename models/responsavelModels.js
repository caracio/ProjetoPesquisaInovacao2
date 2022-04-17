const conexao = require("../infraestrutura/conexao");

class ResponsavelModels {

  cadastrarResponsavel(req, res) {
    const sql = `

    INSERT INTO Responsavel (NM_Rede, Email,Senha) 
    SELECT * FROM (SELECT '${req.nome}'     AS nomeResponsavel, 
                          '${req.Email}'    AS email,
                          '${req.Senha}'    AS senha) AS Responsavel
                           WHERE NOT EXISTS(
                                            SELECT Email
                                            FROM Responsavel 
                                            WHERE Email = '${req.Email}'
                    );    
    `;

    conexao.query(sql, async (error, results) => {
      if (error) {
        await res
          .status(400)
          .json({ ...error, Message: "Cheque os campo novamente..." });
        return;
      }

      if ((await results.affectedRows) == 0) {
        await res
          .status(422)
          .send({ ...results, messageError: "Usúario já cadastrado" });
        return;
      }
      res.status(200).send({
        ...results,
        Message: "Rede de Farmacia cadastrada com sucesso!!! ",
      });
    });
  }
}

module.exports = new ResponsavelModels();
