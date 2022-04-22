const loginUsuarios = require("../models/loginUsuarios");

module.exports = (app) => {
  app.post("/login", (req,res) => {
    loginUsuarios.Login(req.body,res);
  })
};
