const MonitoradorModels = require("../models/monitoradorModels");

module.exports = (app) => {
  app.post("/dashboard/cadastro/Monitorador", (req, res) => {
    //MonitoradorModels.cadastrarMonitorador(req.body, res);
    MonitoradorModels.cadastrarMonitoradorAzure(req.body, res);
  });
};