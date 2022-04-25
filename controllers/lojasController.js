const LojaModels = require("../models/LojaModels");
const validations = require("../utils/validations");

module.exports = (app) => {
  app.post("/dashboard/cadastro/loja", async (req, res) => {
    if (!(await validations.validationCadastroLoja().isValid(req.body))) {
      res.status(400).json({
        erro: true,
        message: "Preencha todos campos de maneira correta",
      });
      return;
    }
    res.status(200).json(req.body);
    //LojaModels.cadastrarLoja(req.body, res);
  });
};
