const express = require("express");
const cors = require("cors");
const consign = require("consign");
const path = require("path");

module.exports = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../..", "public")));

  consign().include("./src/controllers").into(app);

  return app;
};
