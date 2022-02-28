const express = require('express');
const consign = require('consign');
const path = require('path');
const bodyParser = require('body-parser');

module.exports = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}))
  app.use(express.static(path.join(__dirname,'..', 'public')));

  consign()
    .include('controllers')
    .into(app);

  return app;
};
