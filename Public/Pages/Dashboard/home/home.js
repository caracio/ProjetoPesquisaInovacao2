function renderizarLojas() {
  const informacoesUsuario = JSON.parse(sessionStorage.getItem("res"));
  console.log(informacoesUsuario);

  for (let i = 0; i < informacoesUsuario.lojas.length; i++) {
    document.getElementById("lojas").innerHTML += `
     <div class="memory">
     <div class="container-icones" onclick="redirectDashBoard(${informacoesUsuario.lojas[i].id_Loja})">
         <img src="./hospital-building-animate.svg" alt="loja"></a>
     </div>
     <ul class="informations">
       <li>
         <h1>${informacoesUsuario.lojas[i].nome}</h1>
       </li>
       <li>
         <h1 class="teste">${informacoesUsuario.lojas[i].cidade}</h1>
       </li>
       <li>
         <h1 class="teste">${informacoesUsuario.lojas[i].estado}</h1>
       </li>
     </ul>
   </div>

     
     `;
  }
}

renderizarLojas();

function redirectDashBoard(redirectDashBoard) {
  sessionStorage.setItem("idLoja", JSON.stringify(redirectDashBoard));
  window.location = "./dashboard.html";
}
