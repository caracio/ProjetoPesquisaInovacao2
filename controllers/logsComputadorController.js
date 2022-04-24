const LogsMemoriaMassaModels = require("../models/LogsMemoriaMassaModels");
const LogsMemoriaRamModels = require("../models/logsMemoriaRamModels");
const LogsProcessadorModels = require("../models/logsProcessadorModels");

module.exports = (app) => {
  app.get(
    "/grafico/memoriaMassa/:idComputador/Loja/:idLoja",
    async (req, res) => {
      LogsMemoriaMassaModels.getLogsMonitoramento(req.params, res);
    }
  );

  app.get(
    "/grafico/memoriaRam/:idComputador/Loja/:idLoja",
    async (req, res) => {
      LogsMemoriaRamModels.getLogsMonitoramento(req.params, res);
    }
  );

  app.get(
    "/grafico/processador/:idComputador/Loja/:idLoja",
    async (req, res) => {
      LogsProcessadorModels.getLogsMonitoramento(req.params,res);
    }
  );
};
