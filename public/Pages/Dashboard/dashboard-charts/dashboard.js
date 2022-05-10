
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

const informacoesUsuario = JSON.parse(sessionStorage.getItem("res"));

function carregarMaquina() {
    var opcoesMaquina = document.getElementById('maquinasExistentes');

    for (let i = 0; i < dados.length; i++) {
        var option = document.createElement("option");
        option.text = dados[i].nome;
        opcoesMaquina.add(option);
    }
}
carregarMaquina();

function sair(){
  sessionStorage.clear();
  window.location = "../../../index.html";
}