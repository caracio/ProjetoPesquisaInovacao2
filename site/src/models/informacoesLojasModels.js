const { conexaoAzure, sql } = require("../infraestrutura/conexaoAzure");

class InformacoesLojasModels {

  async getInformacoesAzure(req, res) {
    try {
      const pool = await conexaoAzure();
      pool
        .request()
        .input("Email", req.Email)
        .output("erro", sql.VarChar(40))
        .output("message", sql.VarChar(255))
        .execute(
          `dbo.SP_ReloadDatas`,
          async (error, results) => {
            if (error) {
              await res
                .status(500)
                .json({ ...error, Message: "Erro no servidor..." });
              return;
            }

            if (results.recordset[0].erro == "ERROR1") {
              res.status(400).json(results.recordset[0]);
              return;
            }

            res.status(200).json(results.recordset[0]);
          }
        );
    } catch (error) {
      throw new Error("Erro:" + error);
    }
  }
}

module.exports = new InformacoesLojasModels();
