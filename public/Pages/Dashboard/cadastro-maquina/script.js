function sair() {
    sessionStorage.clear();
    window.location = "../../../index.html";
}

const informacoesUsuario = JSON.parse(sessionStorage.getItem("res"));

document.getElementById("nomeAdmin").innerHTML = informacoesUsuario.nome;

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