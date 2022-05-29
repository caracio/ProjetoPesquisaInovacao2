const computadorModels = require('../models/computadorModels');


module.exports = (app) => {
    app.post("/cadastro/computador", (req, res) => {
      computadorModels.cadastroComputador(req.body,res);
    });
  };