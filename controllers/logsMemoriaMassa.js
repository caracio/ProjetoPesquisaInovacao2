const LogsMemoriaMassaModels = require("../models/logsMemoriaMassaModels");

module.exports = (app) => {
  app.get("/graficos/dados/:id", async (req, res) => {
    LogsMemoriaMassaModels.getLogsMonitoramento(req.params, res)
  });
};
