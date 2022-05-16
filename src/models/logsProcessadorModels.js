const {conexao} = require("../infraestrutura/conexao");

class LogsProcessadorModels {
  getLogsMonitoramento(req, res) {
    const sql = `CALL SP_DadosProcessador(?,?,@_Frequencia,@_Uso);`;

    conexao.query(sql, [req.idComputador,req.idLoja], async(error,results)=>{
        if(error){
            await res.status(500).json(results);
            return;
        }

        res.status(200).json(results[0]);
    })
  }
}

module.exports = new LogsProcessadorModels();
