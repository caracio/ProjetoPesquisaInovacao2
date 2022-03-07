const MonitoradorModels = require("../models/monitoradorModels");

module.exports = (app) => {
  app.post("/cadastro/RedeFarmacia/Monitorador", (req, res) => {
    MonitoradorModels.cadastrarMonitorador(req.body, res);
  });
};