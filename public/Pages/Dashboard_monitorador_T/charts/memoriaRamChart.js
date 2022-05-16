const dataChartMemoriaRam = [];

async function getDataLogMemoriaRam() {
  const response = await (
    await fetch(`/grafico/memoriaRam/${1}/Loja/${2}`)
  ).json();
  const responseTratada = (await response[0].QTD_MemoriaUso) / Math.pow(10, 9);

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
