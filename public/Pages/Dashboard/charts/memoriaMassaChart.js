var dataChartMemoriaMassa = [];

async function getDataLogMemoriaMassa() {
  var idComputador = sessionStorage.getItem("idComputador");
  var idLoja = sessionStorage.getItem("idLoja");
  const response = await (await fetch(`/grafico/memoriaMassa/${idComputador}/Loja/${idLoja}`)).json();
  dataChartMemoriaMassa = [];

  dataChartMemoriaMassa.push(
    await response.forEach((data) => {
      if (data) {
        dataChartMemoriaMassa.push(data.EspacoArmazenamento / Math.pow(10, 9));
        dataChartMemoriaMassa.push(data.EspacoLivre / Math.pow(10, 9));
      }
    })
  );
  dataChartMemoriaMassa.pop();
  return dataChartMemoriaMassa;
}

async function plotarGrafico2(idGrafico) {
  await getDataLogMemoriaMassa();
  const ctx = document.getElementById(idGrafico).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: ["Total", "Disponivel"],
      datasets: [
        {
          label: "Armazenamento",
          data: dataChartMemoriaMassa,
          backgroundColor: ["#31C1E130", "#11FBA760"],
          borderColor: ["#31C1E130", "rgba(80, 99, 132, 0.12)"],
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
    myChart.data.datasets[0].data = await getDataLogMemoriaMassa();
    myChart.update();
  }, 4000);
}
