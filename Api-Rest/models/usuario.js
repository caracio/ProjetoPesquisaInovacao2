const conexao = require("../infraestrutura/conexao");

class Usuario {
  adiciona(usuario, res) {
    const sql = "insert into usuario set ?";

    conexao.query(sql, usuario, (erro, resultados) => {
      if (erro) {
        console.log(erro);
        return;
      }
      console.log(resultados);
      res.status(200).send('Cadastro realizado com sucesso ')
    });
  }
}

module.exports = new Usuario();
