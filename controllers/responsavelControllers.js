const responsavelModels = require("../models/responsavelModels");

module.exports = (app) => {
  app.post("/cadastro/Responsavel", (req, res) => {
    console.log(req.body);
    responsavelModels.cadastrarResponsavel(req.body, res);
  });
};
