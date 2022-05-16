async function getDataLogProcessador() {
  var idComputador = sessionStorage.getItem("idComputador");
  var idLoja = sessionStorage.getItem("idLoja");
  const response = await (
    await fetch(`/grafico/processador/${idComputador}/Loja/${idLoja}`)
  ).json();
;

  return await response[0];
}


async function plotarGrafico4(idGrafico) {
  const ctx = document.getElementById(idGrafico).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",

    data: {
      labels:["horario","horario","horario","horario","horario"],
      datasets: [
        {
          label: "Desempenho",
          data: [0],
          backgroundColor: ["#31C1E130"],
          borderColor: ["#31C1E1"],
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
    const DodosProcessador = await getDataLogProcessador();
    
    myChart.data.datasets[0].data.push(await DodosProcessador.Uso);
    myChart.update();
  }, 4000);

}

async function plotarGrafico3(idGrafico) {
  const ctx = document.getElementById(idGrafico).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",

    data: {
      labels: ["Horario", "Horario", "Horario", "Horario"],
      datasets: [
        {
          label: "Desempenho",
          data: [0],
          backgroundColor: [
            "#31C1E130",
            "#11FBA760",
            "#31C1E130",
            "#11FBA760",
            "#31C1E130",
          ],
          borderColor: ["#31C1E1", "#11FBA7"],
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
    const DodosProcessador = await getDataLogProcessador();
    
    myChart.data.datasets[0].data.push(await DodosProcessador.Frequencia / Math.pow(10,9));
    myChart.update();
  }, 4000);
}
