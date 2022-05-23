function sair() {
    sessionStorage.clear();
    window.location = "../../../index.html";
}

const dados = JSON.parse(sessionStorage.getItem("res")).lojas;

function carregarLojas() {
    var opcoesLoja = document.getElementById('lojasExistentes');

    for (let i = 0; i < dados.length; i++) {
        var option = document.createElement("option");
        option.text = dados[i].nome;
        console.log(dados[i].nome);
        opcoesLoja.add(option);
    }
}
carregarLojas();

function cadastroMonitorador() {
    const formulario = new URLSearchParams(
        new FormData(document.getElementById("form_cadastro"))
    );

    fetch("/cadastro/Monitorador", {
        method: "POST",
        body: formulario,
    })
        .then(async (response) => {
            if (!response.ok) {
                const errorInformation = await response.json();
                messageError(errorInformation);
                return;
            }
            window.alert = "Monitorador cadastrado com sucesso.";
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

const informacoesUsuario = JSON.parse(sessionStorage.getItem("res"));

document.getElementById("nomeAdmin").innerHTML = informacoesUsuario.nome;