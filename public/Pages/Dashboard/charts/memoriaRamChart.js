const dataChartMemoriaRam = [];

async function getDataLogMemoriaRam() {
  var idComputador = sessionStorage.getItem("idComputador");
  var idLoja = sessionStorage.getItem("idLoja");
  const response = await (
    await fetch(`/grafico/memoriaRam/${idComputador}/Loja/${idLoja}`)
  ).json();
  const responseTratada = (await response.memoriaUso) / Math.pow(10, 9);

  return responseTratada;
}

async function plotarGrafico1(idGrafico) {
  await getDataLogMemoriaRam();
  const ctx = document.getElementById(idGrafico).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["dia","dia","dia","dia","dia",],
      datasets: [
        {
          label: "Desempenho",
          data: [await getDataLogMemoriaRam()],
          backgroundColor: "#31C1E130",
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
    if (myChart.data.datasets[0].data.length == 5) {
      myChart.data.datasets[0].data.shift();
    }
    myChart.data.datasets[0].data.push(await getDataLogMemoriaRam());
    myChart.update();
  }, 4000);
}
