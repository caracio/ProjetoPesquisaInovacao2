    function Cadastrar() {
  const formulario = new URLSearchParams(
    new FormData(document.getElementById("form_cadastro"))
  );

  fetch("/dashboard/cadastro/Loja", {
    method: "POST",
    body: formulario,
  })
    .then(async (response) => {
      if (!response.ok) {
        console.log(await response.json());
        return;
      }
     console.log(await response.json())
    })
    .catch((error) => {
      console.log(error);
    });

  return false;
}
