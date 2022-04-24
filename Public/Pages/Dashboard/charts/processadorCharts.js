async function getDataLogProcessador() {
  const response = await (
    await fetch(`/grafico/processador/${1}/Loja/${2}`)
  ).json();
  const responseTratada = (await response[0].Frequencia) / Math.pow(10, 9);
  console.log(responseTratada);
  return responseTratada;
}

async function plotarGrafico3(idGrafico) {
  await getDataLogProcessador();
  const ctx = document.getElementById(idGrafico).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",

    data: {
      labels: ["Horario", "Horario", "Horario", "Horario"],
      datasets: [
        {
          label: "Desempenho",
          data: [await getDataLogProcessador()],
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
    myChart.data.datasets[0].data.push(await getDataLogProcessador());
    myChart.update();
  }, 4000);
}
