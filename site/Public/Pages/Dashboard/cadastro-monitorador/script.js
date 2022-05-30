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

function cadastro() {
    
    const nome = document.getElementById("Nome").value;
    const cpf = document.getElementById("CPF").value;
    const email = document.getElementById("Email").value;
    const senha = document.getElementById("Senha").value;
    const opcaoLoja = document.getElementById('lojasExistentes').value;
    
    fetch("/dashboard/cadastro/Monitorador", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            Nome: nome,
            CPF: cpf,
            Email: email,
            Senha: senha,
            FK_Loja:opcaoLoja,
        }),
    })
        .then(async (response) => {
            if (!response.ok) {
                const errorInformation = await response.json();
                messageError(errorInformation);
                return;
            }
            alert("Monitorador cadastrado com sucesso.");
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

