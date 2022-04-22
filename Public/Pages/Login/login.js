var hamburguer = document.querySelector(".hamburguer");

hamburguer.addEventListener("click", function () {
  document.querySelector(".container").classList.toggle("show-menu");
});

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
        console.log(await response.json());
        return;

        console.log(await response.json());
      }
      console.log(await response.json());
    })
    .catch((error) => {
      console.log(error + "AQ");
    });

  return false;
}
