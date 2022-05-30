const datasHoras = [];
var dataCompletaMemoriaRam = new Date();
const minutosRam = dataCompletaMemoriaRam.getMinutes() < 10 ? `0${dataCompletaMemoriaRam.getMinutes()}` : dataCompletaMemoriaRam.getMinutes();

async function getDataLogMemoriaRam() {
  var idComputador = sessionStorage.getItem("idComputador");
  var idLoja = sessionStorage.getItem("idLoja");
  const response = await (
    await fetch(`/grafico/memoriaRam/${idComputador}/Loja/${idLoja}`)
  ).json();
  const responseTratada = (await response.memoriaUso) / Math.pow(10, 9);
  const valorTotal = (await response.totalArmazenamento) / Math.pow(10, 9);
  dataCompletaMemoriaRam = new Date(response.DataLog);
  if (datasHoras.length == 0) {
    datasHoras.push(`${dataCompletaMemoriaRam.getHours()}:${minutos}:${dataCompletaMemoriaRam.getSeconds()}`);
  }
  document.getElementById("totalValorMemoriaRam").innerHTML = `${valorTotal.toFixed(2)}GB`;
  return responseTratada;
}

function mensagemSlackMemoriaRam(mensagem) {
  fetch("https://hooks.slack.com/services/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",{
    method: "POST", 
      headers: {"Content-Type":"application/x-www-form-urlencoded"},
      body: JSON.stringify({
        text: mensagem
      }),
  })
}

async function plotarGrafico1(idGrafico) {
  var dadosMemoriaRam = await getDataLogMemoriaRam();
  const ctx = document.getElementById(idGrafico).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: datasHoras,
      datasets: [
        {
          label: "Desempenho",
          data: [dadosMemoriaRam],
          backgroundColor: "#1b98e0",
          borderColor: "#31C1E1",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  setInterval(async () => {
    if (myChart.data.datasets[0].data.length == 24) {
      datasHoras.pop(0);
      myChart.data.datasets[0].data.shift();
    }

    dadosMemoriaRam = await getDataLogMemoriaRam();

    for (let i = 0; i < myChart.data.datasets[0].data.length; i++) {
      if (dadosMemoriaRam != myChart.data.datasets[0].data[myChart.data.datasets[0].data.length - 1]) {
        myChart.data.datasets[0].data.push(dadosMemoriaRam);
        datasHoras.push(`${dataCompletaMemoriaRam.getHours()}:${minutos}:${dataCompletaMemoriaRam.getSeconds()}`);
          if (dadosMemoriaRam < totalArmazenamento*0.65) {
            myChart.data.datasets[0].borderColor = ["#1b98e0"];
            myChart.data.datasets[0].backgroundColor = ["#31C1E1"];
          } else if (dadosMemoriaRam >= totalArmazenamento*0.65 && dadosMemoriaRam <= totalArmazenamento*0.84) {
            myChart.data.datasets[0].borderColor = ["#FFFF00"];
            myChart.data.datasets[0].backgroundColor = ["#FFFF00"];
            mensagemSlackMemoriaRam(`Atenção a memoria ram da maquina ${sessionStorage.getItem("idComputador")} atingiu com ${dadosMemoriaRam} de ${totalArmazenamento}`)
          } else if (dadosMemoriaRam >= totalArmazenamento*0.85) {
            myChart.data.datasets[0].borderColor = ["#FF0000"];
            myChart.data.datasets[0].backgroundColor = ["#FF0000"];
            mensagemSlackMemoriaRam(`Atenção a memoria ram da maquina ${sessionStorage.getItem("idComputador")} atingiu com ${dadosMemoriaRam} de ${totalArmazenamento}`)
          }
        i += myChart.data.datasets[0].data.length - i;
      };
      myChart.update();
    }
  }, 4000);
}
