const RedeFarmaciaModels = require("../models/redeFarmaciaModels");

module.exports = (app) => {
  app.post("/cadastro/RedeFarmacia", (req, res) => {
    RedeFarmaciaModels.cadastrarRedeFarmacia(req.body, res);
  });
};
