
(function dadosUsuario() {
  document.getElementById("nomeUsuario").innerHTML = JSON.parse(
    sessionStorage.getItem("res")
  ).nome;

  if (JSON.parse(sessionStorage.getItem("idLoja"))) {
    JSON.parse(sessionStorage.getItem("res")).lojas.forEach((element) => {
      if (element.id_Loja == JSON.parse(sessionStorage.getItem("idLoja"))) {
        document.getElementById("nomeLoja").innerHTML = element.nome;
      }
    });
  }
})();

//ARRUMAR
const informacoesUsuario = JSON.parse(sessionStorage.getItem("res"));
console.log(informacoesUsuario.lojas[0].computadores);

function carregarMaquina() {
  var opcoesMaquina = document.getElementById('maquinasExistentes');
  var option = document.createElement("option");
  for (let i = 0; i < informacoesUsuario.lojas[0].computadores.lenght; i++) {
    option.text = informacoesUsuario.lojas[0].computadores[i].ID_Computador;
    opcoesMaquina.add(option);
  }

  option.text = informacoesUsuario.loja[JSON.parse(sessionStorage.getItem("idLoja"))].computadores;
  opcoesMaquina.add(option);
}
carregarMaquina();

function sair() {
  sessionStorage.clear();
  window.location = "../../../index.html";
}