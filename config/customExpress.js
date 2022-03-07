const express = require('express');
const consign = require('consign');
const path = require('path');


module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({extended:true}))
  app.use(express.static(path.join(__dirname,'..', 'Public/Pages/Home')));
  
  consign()
    .include('controllers')
    .into(app);

  return app;
};
