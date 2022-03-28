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

let btnOlho = document.querySelector('.fa-eye');

btnOlho.addEventListener('click', () => {
  let inputSenha = document.querySelector('#in_Senha');
  let inputConfirmaSenha = document.querySelector('#in_confirmar_Senha');

  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
  
  if (inputConfirmaSenha.getAttribute('type') == 'password') {
    inputConfirmaSenha.setAttribute('type', 'text');
  } else {
    inputConfirmaSenha.setAttribute('type', 'password');
  }
});
