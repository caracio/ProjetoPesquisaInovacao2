const informacoesUsuario = JSON.parse(sessionStorage.getItem("res"));
document.getElementById("nomeAdmin").innerHTML = informacoesUsuario.nome;

function sair() {
    sessionStorage.clear();
    window.location = "../../../index.html";
}

const dados = JSON.parse(sessionStorage.getItem("res")).lojas;

function carregarLojas() {
    var opcoesLoja = document.getElementById('lojasExistentes');

    for (let i = 0; i < dados.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = informacoesUsuario.lojas[i].nome;
        option.value = informacoesUsuario.lojas[i].id_Loja;
        opcoesLoja.appendChild(option);
    }
}
carregarLojas();

function cadastroMaquina() {
    const idMaquina = document.getElementById("Numero").value;
    const senha = document.getElementById("Senha").value;
    const opcaoLoja = document.getElementById('lojasExistentes').value;
    
    fetch("/dashboard/cadastro/computador", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            id_Computador: idMaquina,
            senha: senha,
            fk_Loja:opcaoLoja,
        }),
    })
        .then(async (response) => {
            if (!response.ok) {
                const errorInformation = await response.json();
                messageError(errorInformation);
                return;
            }
            alert("Maquina cadastrada com sucesso.");
        })
        .catch(async (error) => {
            console.log(error);
        });

    return false;
}

const messageError = (errorInformation) => {
    console.log(errorInformation);
    document.getElementById("mensagemErro").innerHTML = errorInformation.message;
};