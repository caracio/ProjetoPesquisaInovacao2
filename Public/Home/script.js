
var hamburguer = document.querySelector(".hamburguer");

hamburguer.addEventListener("click", function () {
  document.querySelector(".container").classList.toggle("show-menu");
});

function abrirModal() {
  document.getElementById("modal").style.top = "0";
}

function fecharModal() {
  document.getElementById("modal").style.top = "-100%";
}

