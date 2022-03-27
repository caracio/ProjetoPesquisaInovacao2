const RedeFarmaciaModels = require("../models/redeFarmaciaModels");

module.exports = (app) => {
  app.post("/cadastro/RedeFarmacia", (req, res) => {
    console.log(req.body);
    RedeFarmaciaModels.cadastrarRedeFarmacia(req.body, res);
  });
};
