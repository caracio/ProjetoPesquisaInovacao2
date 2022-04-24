const conexao = require("../infraestrutura/conexao");

class LogsMemoriaRamModels {
  getLogsMonitoramento(req, res) {
    const sql = `CALL SP_DadosMemoriaRam(?,?,@_memoriaUso);`;

    conexao.query(sql, [req.idComputador,req.idLoja], async(error,results)=>{
        if(error){
            await res.status(500).json(results);
            return;
        }

       await res.status(200).json(results[0]);

    })
  }
}

module.exports = new LogsMemoriaRamModels();