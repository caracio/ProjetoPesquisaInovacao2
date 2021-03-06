const {conexao} = require("../infraestrutura/conexao");
const { conexaoAzure, sql } = require("../infraestrutura/conexaoAzure");

class LogsMemoriaMassaModels {
  getLogsMonitoramento(req, res) {
    const sql = `CALL SP_DadosMemoriaMassa(?,?,@_espacoArmazenado,@_espacoLivre);`;

    conexaoAzure.query(sql, [req.idComputador,req.idLoja], async(error,results)=>{
        if(error){
            await res.status(500).json(results);
            return;
        }

        res.status(200).json(results[0]);
    })

  }
  async getLogsMonitoramentoAzure(req, res){
    const { idComputador, idLoja }= req;

    const pool = await conexaoAzure();

    pool
    .request()
    .input('ID_Computador', idComputador)
    .input('FK_Loja', idLoja)
    .output('leitura', sql.Int)
    .output('escrita', sql.Int)
    .output('EspacoArmazenado', sql.BigInt)
    .output('EspacoLivre', sql.BigInt)
    .output('DataLog', sql.DateTime)
    .execute(
      'dbo.SP_LogsMemoriaMassa', async(error, results)=>{ 
        if (error) {
          return await res
            .status(500)
            .json({ ...error, Message: "Erro no servidor..." });
        }
        await res.status(200).json(results.output);
      }
    )
  }
}

module.exports = new LogsMemoriaMassaModels();
