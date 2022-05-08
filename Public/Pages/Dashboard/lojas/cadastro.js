function cadastro() {
  const formulario = Object.fromEntries(
    new URLSearchParams(new FormData(document.getElementById("form_cadastro")))
  );
  const idusuario = JSON.parse(sessionStorage.getItem("res")).id_Responsavel;

  fetch("/dashboard/cadastro/loja", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formulario, ID_Responsavel: idusuario }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorInformation = await response.json();
        messageError(errorInformation);
        return;
      }

      window.Location = "../home/home.html";
    })
    .catch((error) => {
      console.log(error);
    });

  return false;
}

const messageError = (errorInformation) => {
  console.log(errorInformation);
  document.getElementById("mensagemErro").innerHTML = errorInformation.message;
};
