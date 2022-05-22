const { conexao } = require("../infraestrutura/conexao");
const { conexaoAzure, sql } = require("../infraestrutura/conexaoAzure");

class LogsMemoriaRamModels {
  getLogsMonitoramento(req, res) {
    const sql = `CALL SP_DadosMemoriaRam(?,?,@_memoriaUso);`;

    conexao.query(
      sql,
      [req.idComputador, req.idLoja],
      async (error, results) => {
        if (error) {
          await res.status(500).json(results);
          return;
        }

        await res.status(200).json(results[0]);
      }
    );
  }

  async getLogsMonitoramentoAzure(req, res) {
    const { idComputador, idLoja } = req;

    const pool = await conexaoAzure();

    pool
      .request()
      .input("ID_Computador", idComputador)
      .input("ID_Loja", idLoja)
      .output("memoriaUso", sql.BigInt)
      .output('DataLog', sql.DateTime)
      .execute("dbo.SP_LogsMemoriaRam", async (error, results) => {
        if (error) {
          return await res
            .status(500)
            .json({ ...error, Message: "Erro no servidor..." });
        }
        
        await res.status(200).json(results.output);
      });
  }
}

module.exports = new LogsMemoriaRamModels();
