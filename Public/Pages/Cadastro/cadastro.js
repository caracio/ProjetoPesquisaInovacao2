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

function cadastro() {
  const formulario = new URLSearchParams(
    new FormData(document.getElementById("form_cadastro"))
  );

  fetch("/cadastro/Responsavel", {
    method: "POST",
    body: formulario,
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorInformation = await response.json();
        messageError(errorInformation);
        return;
      }
      window.location = "../Login/index.html";
    })
    .catch(async (error) => {
      console.log(error);
    });

  return false;
}

const messageError = (errorInformation) => {
  console.log(errorInformation);
  document.getElementById("mensagemErro").innerHTML = errorInformation.message;
};
