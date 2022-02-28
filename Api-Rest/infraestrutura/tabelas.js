class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarUsuario();
  }

  criarUsuario() {
    const sql = `
        create table if not exists  usuario (
         id int primary key auto_increment,
         nome varchar(50),
         senha varchar(30)
        );
        `;
    this.conexao.query(sql, (error) => {
      if (error) {
        console.log(erro);
        return;
      }
      console.log("Tabela usuario criada");
    });
  }
}
module.exports = new Tabelas;
