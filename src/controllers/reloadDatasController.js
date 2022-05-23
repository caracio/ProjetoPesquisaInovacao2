const InformacoesLojasModels = require("../models/informacoesLojasModels");

module.exports = (app) => {
  app.post("/recarregar/dados/loja", (req, res) => {
    InformacoesLojasModels.getInformacoesAzure(req.body, res);
  });
};
