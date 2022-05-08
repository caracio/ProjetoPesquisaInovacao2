module.exports = (app) => {
  app.get("/", (_, res) => {
    res.render("Home/index", { title: "Express" });
  });
};

/* comentario de versionamento
 */