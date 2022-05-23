/*Declara a viravel hamburguer que quando é clicado chama uma função
que pega o container e com a lista de classes altera ou adiciona com o
toggle uma classe chamada show que muda o comportamento da sidebar
*/

var hamburguer = document.querySelector(".hamburguer");

hamburguer.addEventListener("click", function () {
  document.querySelector(".container").classList.toggle("show-menu");
});

/* OU usando arrow function
document.querySelector(".hamburguer").addEventListener("click", () =>
      document.querySelector(".container").classList.toggle("show-menu")
);*/

const res = require("express/lib/response");

function login() {
  const formulario = new URLSearchParams(
    new FormData(document.getElementById("form_login"))
  );

  fetch("/login", {
    method: "POST",
    body: formulario,
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorInformatiom = await response.json();
        messageErrorLogin(errorInformatiom);
        return;
      }
      const res = await response.json();
      console.log(res, response);
      sessionStorage.setItem("res", JSON.stringify(res));

      if (sessionStorage.getItem("res")) {
        window.location = "../Dashboard/home/home.html";
        return;
      }
      alert("Erro!!!");
    })
    .catch((error) => {
      console.log(error);
    });

  return false;
}

function messageErrorLogin(errorInformatiom) {
  console.log(errorInformatiom);
  document.getElementById("mensagemErro").innerHTML = errorInformatiom.message;
}
