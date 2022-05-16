
(function dadosUsuario() {
  document.getElementById("nomeUsuario").innerHTML = JSON.parse(
    sessionStorage.getItem("res")
  ).nome;

  if (JSON.parse(sessionStorage.getItem("idLoja"))) {
    JSON.parse(sessionStorage.getItem("res")).lojas.map((element) => {
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
  for (let i = 0; i < informacoesUsuario.lojas[0].computadores.length; i++) {
    var option = document.createElement("option");
    option.innerHTML = `Maquina ${informacoesUsuario.lojas[0].computadores[i].ID_Computador}`;
    option.value = informacoesUsuario.lojas[0].computadores[i].ID_Computador;
    opcoesMaquina.appendChild(option);
    opcoesMaquina.removeChild
  }
  sessionStorage.setItem("idComputador", informacoesUsuario.lojas[0].computadores[0].ID_Computador);

  // option.text = informacoesUsuario.loja[0].computadores;
  // opcoesMaquina.add(option);
}
carregarMaquina();

function mudarMaquina(){
  var opcoesMaquina = document.getElementById('maquinasExistentes');
  sessionStorage.setItem("idComputador", opcoesMaquina.value);
};

function sair() {
  sessionStorage.clear();
  window.location = "../../../index.html";
}