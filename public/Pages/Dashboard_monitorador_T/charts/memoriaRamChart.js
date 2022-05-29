const dataChartMemoriaRam = [];
const datasHoras = [];

async function getDataLogMemoriaRam() {
  var idComputador = sessionStorage.getItem("idComputador");
  var idLoja = sessionStorage.getItem("idLoja");
  const response = await (
    await fetch(`/grafico/memoriaRam/${idComputador}/Loja/${idLoja}`)
  ).json();
  const responseTratada = (await response.memoriaUso) / Math.pow(10, 9);
  const dataCompleta = new Date(response.DataLog);
  const minutos = dataCompleta.getMinutes() < 10 ?`0${dataCompleta.getMinutes()}`: dataCompleta.getMinutes(); 
  if(datasHoras.length == 5){
    datasHoras.pop(0);
  }
  datasHoras.push(`${dataCompleta.getHours()}:${minutos}:${dataCompleta.getSeconds()}`);
  document.getElementById("totalValorMemoriaRam").innerHTML = `${responseTratada.toFixed(2)}GB`;
  return responseTratada;
}

async function plotarGrafico1(idGrafico) {
  // await getDataLogMemoriaRam();
  const ctx = document.getElementById(idGrafico).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: datasHoras,
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
