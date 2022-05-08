const loginUsuarios = require("../models/loginUsuarios");
const validations = require("../utils/validations");

module.exports = (app) => {
  app.post("/login", async (req, res) => {
    if (!(await validations.validationLogin().isValid(req.body))) {
      return res.status(400).json({
        erro: true,
        message: "Preencha todos os campos de maneira correta!!!!",
      });
    }
    //loginUsuarios.Login(req.body, res)
     loginUsuarios.LoginAzure(req.body, res);
  });
};
