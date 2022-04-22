const responsavelModels = require("../models/responsavelModels");

module.exports = (app) => {
  app.post("/cadastro/Responsavel", (req, res) => {
     responsavelModels.cadastrarResponsavel(req.body, res);
  });

};
