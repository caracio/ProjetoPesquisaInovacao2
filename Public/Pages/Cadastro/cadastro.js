


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
};


