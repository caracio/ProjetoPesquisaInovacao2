const conexao = require("../infraestrutura/conexao");

class MonitoradorModels {
  cadastrarMonitorador(req, res) {
    const sql = `
    INSERT INTO Monitorador (nome,CPF,email,senha,grauAcesso,fkRedeFarmacia) 
    SELECT * FROM (SELECT '${req.nome}' AS nome,
                          '${req.CPF}' AS CPF, 
                          '${req.email}' AS email,
                          '${req.senha}' AS senha,
                          '${req.grauAcesso}' AS grauAcesso,
                          ${req.fkRedeFarmacia} AS fkRedeFarmacia
                          ) AS Monitorador
                           WHERE NOT EXISTS(
                                            SELECT CPF
                                            FROM Monitorador 
                                            WHERE CPF = '${req.CPF}'
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
          .send({ ...results, messageError: "Monitorador já cadastrado" });
        return;
      }
      res.status(200).send({
        ...results,
        Message: "Monitorador cadastrado com sucesso!!! ",
      });
    });
  }
}

module.exports = new MonitoradorModels();