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
