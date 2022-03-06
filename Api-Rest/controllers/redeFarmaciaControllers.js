const redeFarmaciaModels = require("../models/redeFarmaciaModels");
const RedeFarmaciaModels = require("../models/redeFarmaciaModels");

module.exports = (app) => {
  app.post("/cadastro/RedeFaramacia", (req, res) => {
    redeFarmaciaModels.cadastrarRedeFarmacia(req.body, res);
  });
};
