function cadastrar() {
     var formulario = new URLSearchParams( new FormData(document.getElementById('form_cadastro')));
    console.log(formulario);
     fetch('/cadastro/Responsavel', {
         method: 'POST',
         body: formulario,
     }).then((response)=>{
        if(response.ok){
            window.location = './Pages/Dashboard/index.html';
        }
     }).catch((error)=>{
         console.console.log(error + "Tente Novamente");
     })

     return false;
}