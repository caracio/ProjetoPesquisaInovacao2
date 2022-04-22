const responsavelModels = require("../models/responsavelModels");

module.exports = (app) => {
  app.post("/cadastro/Responsavel", (req, res) => {
    /* aqui ficará a validação */
     responsavelModels.cadastrarResponsavel(req.body, res);
  });

};
