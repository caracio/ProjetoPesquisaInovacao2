
function renderizarLojas() {
  const informacoesUsuario = JSON.parse(sessionStorage.getItem("res"));
  console.log(informacoesUsuario);

  for (let i = 0; i < informacoesUsuario.lojas.length; i++) {
    document.getElementById("lojas").innerHTML = `
     <div class="memory">
     <div class="container-icones"><a href="./dashboard.html">
         <img src="./hospital-building-animate.svg" alt="loja"></a>
     </div>
     <ul class="informations">
       <li>
         <h1>${informacoesUsuario.lojas[i].id_Loja}</h1>
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
};

renderizarLojas();