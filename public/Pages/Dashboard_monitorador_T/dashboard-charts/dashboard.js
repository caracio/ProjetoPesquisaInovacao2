const informacoesUsuario = JSON.parse(sessionStorage.getItem("res"));

if(sessionStorage.getItem("idComputador") != undefined){
  document.getElementById("exibir-numeracao-maquina").innerHTML += `${sessionStorage.getItem("idComputador")}`;
  document.getElementById("nomeProcessador").innerHTML = `${informacoesUsuario.lojas[0].computadores[0].Modelo}`;
  document.getElementById("situacao-maquina").innerHTML = `Situação: ${sessionStorage.getItem("situacaoMaquina")}`;
}

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

function carregarMaquina() {
  var opcoesMaquina = document.getElementById('maquinasExistentes');
  for (let i = 0; i < informacoesUsuario.lojas[0].computadores.length; i++) {
    var option = document.createElement("option");
    option.innerHTML = `Máquina ${informacoesUsuario.lojas[0].computadores[i].ID_Computador}`;
    option.value = informacoesUsuario.lojas[0].computadores[i].ID_Computador;
    opcoesMaquina.appendChild(option);
    opcoesMaquina.removeChild
  }
  sessionStorage.setItem("idComputador", informacoesUsuario.lojas[0].computadores[0].ID_Computador);
}
carregarMaquina();

function mudarMaquina(){
  var opcoesMaquina = document.getElementById('maquinasExistentes');
  sessionStorage.setItem("idComputador", opcoesMaquina.value);
  document.getElementById("exibir-numeracao-maquina").innerHTML = `Informações da Máquina ${sessionStorage.getItem("idComputador")}`;
  document.getElementById("nomeProcessador").innerHTML = `${informacoesUsuario.lojas[0].computadores[0].Modelo}`;
};

function sair() {
  sessionStorage.clear();
  window.location = "../../../index.html";
}