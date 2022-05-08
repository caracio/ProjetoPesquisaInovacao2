const {conexao} = require("../infraestrutura/conexao");

class LogsMemoriaMassaModels {
  getLogsMonitoramento(req, res) {
    const sql = `CALL SP_DadosMemoriaMassa(?,?,@_espacoArmazenado,@_espacoLivre);`;

    conexao.query(sql, [req.idComputador,req.idLoja], async(error,results)=>{
        if(error){
            await res.status(500).json(results);
            return;
        }

        res.status(200).json(results[0]);
    })
  }
}

module.exports = new LogsMemoriaMassaModels();
