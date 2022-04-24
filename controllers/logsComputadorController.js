const LogsMemoriaMassaModels = require("../models/logsMemoriaMassaModels");
const LogsMemoriaRamModels = require("../models/logsMemoriaRamModels");

module.exports = (app) => {
  app.get("/grafico/memoriaMassa/:idComputador/Loja/:idLoja", async (req, res) => {
    LogsMemoriaMassaModels.getLogsMonitoramento(req.params, res);
  });

  app.get("/grafico/memoriaRam/:idComputador/Loja/:idLoja", async (req, res) => {
       LogsMemoriaRamModels.getLogsMonitoramento(req.params,res);
  });
};
