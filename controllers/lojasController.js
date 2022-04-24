const LojaModels = require("../models/LojaModels");

module.exports = (app) => {
    app.post("/dashboard/cadastro/Loja", (req, res) => {
        console.log(req.body);
        //LojaModels.cadastrarLoja(req.body, res);
    });
  };