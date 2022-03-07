const conexao = require("../infraestrutura/conexao");

class RedeFarmaciaModels {

  cadastrarRedeFarmacia(req, res) {
    const sql = `
 
    INSERT INTO RedeFarmacia (CNPJ,nomeRede, email,senha) 
    SELECT * FROM (SELECT '${req.CNPJ}' AS cnpj,
                          '${req.nomeRede}' AS nomeRede, 
                          '${req.email}' AS email,
                          '${req.senha}' AS senha) AS redeFarmacia
                           WHERE NOT EXISTS(
                                            SELECT CNPJ
                                            FROM RedeFarmacia 
                                            WHERE CNPJ = '${req.CNPJ}'
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

module.exports = new RedeFarmaciaModels();
