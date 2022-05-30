var informacoesUsuario = JSON.parse(sessionStorage.getItem("res"));
var opcoesMaquina = document.getElementById('maquinasExistentes');


if (sessionStorage.getItem("idComputador") == undefined) {
  informacoesUsuario.lojas.map((loja) => {
    if (loja.id_Loja == sessionStorage.getItem("idLoja")) {
      return sessionStorage.setItem("idComputador", loja.computadores[0].ID_Computador);
    }
  });
}

var valoresComputador = {};

informacoesUsuario.lojas.map((loja) => {
  if (loja.id_Loja == sessionStorage.getItem("idLoja")) {
    loja.computadores.map((computador) => {
      if (computador.ID_Computador == sessionStorage.getItem("idComputador")) {
        valoresComputador = computador;
      }
    })
  }
})

if (sessionStorage.getItem("idComputador") != undefined) {
  document.getElementById("exibir-numeracao-maquina").innerHTML += `${sessionStorage.getItem("idComputador")}`;
  document.getElementById("nomeProcessador").innerHTML = `${valoresComputador.Modelo}`;
  document.getElementById("nomeDisco").innerHTML = `${valoresComputador.ModeloMemoriaMassa}`;
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
  for (let il = 0; il < informacoesUsuario.lojas.length; il++) {
    if (informacoesUsuario.lojas[il].id_Loja == sessionStorage.getItem("idLoja")) {
      for (let i = 0; i < informacoesUsuario.lojas[il].computadores.length; i++) {
        if (i > 0 && informacoesUsuario.lojas[il].computadores[i].ID_Computador != informacoesUsuario.lojas[il].computadores[i - 1].ID_Computador) {
          var option = document.createElement("option");
          option.innerHTML = `Máquina ${informacoesUsuario.lojas[il].computadores[i].ID_Computador}`;
          option.value = informacoesUsuario.lojas[il].computadores[i].ID_Computador;
          opcoesMaquina.appendChild(option);
        } else if(i == 0) {
          var option = document.createElement("option");
          option.innerHTML = `Máquina ${informacoesUsuario.lojas[il].computadores[i].ID_Computador}`;
          option.value = informacoesUsuario.lojas[il].computadores[i].ID_Computador;
          opcoesMaquina.appendChild(option);
        }
        // opcoesMaquina.removeChild
      }
    }
  }
  // sessionStorage.setItem("idComputador", informacoesUsuario.lojas[0].computadores[0].ID_Computador);
}
carregarMaquina();

for (let i = 0; i < opcoesMaquina.options.length; i++) {
  if (opcoesMaquina.options[i].value == sessionStorage.getItem("idComputador")) {
    opcoesMaquina.selectedIndex = i;
  }
}

function mudarMaquina() {
  sessionStorage.setItem("idComputador", opcoesMaquina.value);
  window.location.reload();
};

function sair() {
  sessionStorage.clear();
  window.location = "../../../index.html";
}