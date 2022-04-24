const conexao = require("../infraestrutura/conexao");

class LogsMemoriaMassaModels {
  getLogsMonitoramento(req, res) {
    const sql = `CALL SP_DadosMemoriaMassa(?, @_espacoArmazenado, @_espacoLivre);`;

    conexao.query(sql, [req.id], async(error,results)=>{
        if(error){
            await res.status(500).json(results);
            return;
        }

        res.status(200).json(results);
    })
  }
}

module.exports = new LogsMemoriaMassaModels();
