module.exports = (app) => {
  app.get("/", (_, res) => {
    res.render("index", { title: "Express" });
  });
};
