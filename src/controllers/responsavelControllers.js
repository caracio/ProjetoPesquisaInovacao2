const validations = require("../utils/validations");
const responsavelModels = require("../models/responsavelModels");

module.exports = (app) => {
  app.post("/cadastro/Responsavel", async (req, res) => {
    if (!(await validations.validationRegister().isValid(req.body))) {
      return res.status(400).json({
        erro: true,
        message: "Preencha todos os campos de maneira correta!!!!",
      });
    }
  //  responsavelModels.cadastrarResponsavel(req.body, res);
    responsavelModels.cadastrarResponsavelAzure(req.body, res);
  });
};
