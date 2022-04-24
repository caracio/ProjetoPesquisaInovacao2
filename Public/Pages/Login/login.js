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
      sessionStorage.setItem("res", JSON.stringify(res));

      if (sessionStorage.getItem("res")) {
           window.location = "../Dashboard/home.html";
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

