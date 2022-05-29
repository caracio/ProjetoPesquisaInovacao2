//var dataChartMemoriaMassa = [];

async function getDataLogMemoriaMassa() {
  var idComputador = sessionStorage.getItem("idComputador");
  var idLoja = sessionStorage.getItem("idLoja");
  const response = await (
    await fetch(`/grafico/memoriaMassa/${idComputador}/Loja/${idLoja}`)
  ).json();

  dataChartMemoriaMassa = [];

  if (await response) {
    dataChartMemoriaMassa.push(response.EspacoArmazenado / Math.pow(10, 9));
    dataChartMemoriaMassa.push(
      (response.EspacoArmazenado - response.EspacoLivre) / Math.pow(10, 9)
    );
    dataChartMemoriaMassa.push(response.EspacoLivre / Math.pow(10, 9));
  }
  if (dataChartMemoriaMassa == undefined) {
    sessionStorage.setItem("situacaoMaquina", "Desligada");
  } else {
    sessionStorage.setItem("situacaoMaquina", "Ligada");
  }

  return dataChartMemoriaMassa;
}

async function plotarGrafico2() {
  await getDataLogMemoriaMassa();

  const data_pie = {
    labels: ["Em uso", "Disponível"],
    datasets: [
      {
        data: dataChartMemoriaMassa.shift(),
        backgroundColor: ["#11FBA760","#1b98e0"],
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      maintainAspectRatio: false,
    },
  };

  const config_pie = {
    type: "doughnut",
    data: data_pie,
  };

  var myChart = new Chart(
    document.getElementById("grafico-memoriaMassa"),
    config_pie
  );

  setInterval(async () => {
    var response = await getDataLogMemoriaMassa();
    if ((await response[1] * 100) / response[0] >= 95) {
      myChart.data.datasets[0].backgroundColor.splice(
        0,
        myChart.data.datasets[0].backgroundColor.length
      );
      myChart.data.datasets[0].backgroundColor = ["#ff0000", "#1b98e0"];
    } else if ((await response[1] * 100) / response[0] >= 75) {
      myChart.data.datasets[0].backgroundColor.splice(
        0,
        myChart.data.datasets[0].backgroundColor.length
      );
      myChart.data.datasets[0].backgroundColor = ["#f6ce55", "#1b98e0"];
    } else {
      myChart.data.datasets[0].backgroundColor.splice(
        0,
        myChart.data.datasets[0].backgroundColor.length
      );
      myChart.data.datasets[0].backgroundColor = ["#11FBA760","#1b98e0"];
    }
    document.getElementById("valor-total").innerHTML= `${response[0].toFixed(2)}GB`;
    document.getElementById("valor-uso").innerHTML= `${response[1].toFixed(2)}GB (${((response[1] * 100) / response[0]).toFixed(2)}%)`;
    document.getElementById("valor-disponivel").innerHTML= `${response[2].toFixed(2)}GB`;
    await response.shift();
    myChart.data.datasets[0].data = await response;
    myChart.update();
  }, 4000);
}
