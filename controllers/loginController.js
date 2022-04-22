const loginUsuarios = require("../models/loginUsuarios");

module.exports = (app) => {
  app.post("/login", (req,res) => {
    /* Aqui ficara a validação */
    loginUsuarios.Login(req.body,res);
  })
};
