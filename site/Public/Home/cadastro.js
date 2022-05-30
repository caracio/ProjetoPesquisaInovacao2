function cadastrar() {
  var formulario = new URLSearchParams(
    new FormData(document.getElementById("form_cadastro"))
  );
  fetch("/cadastro/Responsavel", {
    method: "POST",
    body: formulario,
  })
    .then((response) => {
      if (response.ok) {
        setTimeout(() => {
          window.location = "./Pages/Dashboard/index.html";
        }, 1000);
      }
    })
    .catch((error) => {
      console.console.log(error + "Tente Novamente");
    });

  return false;
}
