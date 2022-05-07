
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

function sair(){
  sessionStorage.clear();
  window.location = "../../../index.html";
}