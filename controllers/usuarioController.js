const usuario = require("../models/usuario");

module.exports = (app) => {
  app.get("/", (_, res) => {
    res.render('index',{title:'Express'})
  });

  app.post("/", (req, res) => {
    console.log(req.body.nome);
    
    
    
  });
};
