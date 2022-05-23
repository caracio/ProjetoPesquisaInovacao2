const informacoesUsuario = JSON.parse(sessionStorage.getItem("res"));

document.getElementById("nomeAdmin").innerHTML = informacoesUsuario.nome;

function renderizarLojas() {
  informacoesUsuario.lojas.map((lojas) => {
    document.getElementById("lojas").innerHTML += `
     <div class="memory" onclick="redirectDashBoard(${lojas.id_Loja})">
     <div class="container-icones">
        <img src="../assets/images/hospital-building-animate.svg" alt="Loja"/></a>
     </div>
     <ul class="informations">
       <li>
         <h1>${lojas.nome}</h1>
       </li>
       <li>
         <h1 class="teste">${lojas.cidade}</h1>
       </li>
       <li>
         <h1 class="teste">${lojas.estado}</h1>
       </li>
     </ul>
   </div>`;
  })
}

renderizarLojas();

function redirectDashBoard(redirectDashBoard) {
  sessionStorage.setItem("idLoja", JSON.stringify(redirectDashBoard));
  window.location = "../dashboard-charts/dashboard.html";
}

function sair() {
  sessionStorage.clear();
  window.location = "../../../index.html";
}