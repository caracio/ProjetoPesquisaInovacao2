const datasHorasProcessador = [];
var dataCompleta = new Date();
const minutos = dataCompleta.getMinutes() < 10 ?`0${dataCompleta.getMinutes()}`: dataCompleta.getMinutes();

async function getDataLogProcessador() {
  var idComputador = sessionStorage.getItem("idComputador");
  var idLoja = sessionStorage.getItem("idLoja");
  const response = await (
    await fetch(`/grafico/processador/${idComputador}/Loja/${idLoja}`)
  ).json();
  if (datasHorasProcessador.length == 0) {
    dataCompleta = new Date(response.DataLog);
    datasHorasProcessador.push(`${dataCompleta.getHours()}:${minutos}:${dataCompleta.getSeconds()}`);
  }
  return await response;
}

function messagemSlack(mensagem) {
  fetch("https://hooks.slack.com/services/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",{
    method: "POST", 
      headers: {"Content-Type":"application/x-www-form-urlencoded"},
      body: JSON.stringify({
        text: mensagem
      }),
  })
}

async function plotarGrafico4(idGrafico) {
  var dadosProcessador = await getDataLogProcessador();
  const ctx = document.getElementById(idGrafico).getContext("2d");
  
  let myChart = new Chart(ctx, {
    type: "line",

    data: {
      labels: datasHorasProcessador,
      datasets: [
        {
          label: "Desempenho",
          data: [dadosProcessador.Uso],
          backgroundColor: ["#1b98e0"],
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
      maintainAspectRatio: false,
    },
  });

  setInterval(async () => {
    if (myChart.data.datasets[0].data.length == 24) {
      datasHorasProcessador.pop(0);
      myChart.data.datasets[0].data.shift();
    }
    dadosProcessador = await getDataLogProcessador();
    
    if (myChart.data.datasets[0].data.length > 1) {
      for (let i = 0; i < myChart.data.datasets[0].data.length; i++) {
        if (dadosProcessador.Uso !=  myChart.data.datasets[0].data[myChart.data.datasets[0].data.length-1]) {
          dataCompleta = new Date(dadosProcessador.DataLog);
          myChart.data.datasets[0].data.push(await dadosProcessador.Uso);
          datasHorasProcessador.push(`${dataCompleta.getHours()}:${minutos}:${dataCompleta.getSeconds()}`);
          myChart.data.datasets[0].data.map((dado) => {
            if (dado > 0 ) {
              myChart.data.datasets[0].borderColor= ["#1b98e0"];
              myChart.data.datasets[0].backgroundColor= ["#31C1E1"];
            } else if (dado >= 65 && dado <= 84) {
              myChart.data.datasets[0].borderColor= ["#FFFF00"];
              myChart.data.datasets[0].backgroundColor= ["#FFFF00"];
              messagemSlack(`Atenção o processador da maquina ${sessionStorage.getItem("idComputador")} esta com ${dadosProcessador.Uso}% de uso`)
            } else if (dado >= 85 ) {
              myChart.data.datasets[0].borderColor= ["#FF0000"];
              myChart.data.datasets[0].backgroundColor= ["#FF0000"];
              messagemSlack(`ALERTA!!! Cuidado o processador da maquina ${sessionStorage.getItem("idComputador")} esta com ${dadosProcessador.Uso}% de uso`)
            }
          });
          i+= myChart.data.datasets[0].data.length-i;
        };
        myChart.update();
      }
    } else {
      dataCompleta = new Date(dadosProcessador.DataLog);
      myChart.data.datasets[0].data.push(await dadosProcessador.Uso);
      datasHorasProcessador.push(`${dataCompleta.getHours()}:${minutos}:${dataCompleta.getSeconds()}`);
      myChart.data.datasets[0].data.map((dado) => {
        if (dado > 0 ) {
          myChart.data.datasets[0].borderColor= ["#1b98e0"];
          myChart.data.datasets[0].backgroundColor= ["#31C1E1"];
        } else if (dado >= 65 && dado <= 84) {
          myChart.data.datasets[0].borderColor= ["#FFFF00"];
          myChart.data.datasets[0].backgroundColor= ["#FFFF00"];
          messagemSlack(`Atenção o processador da maquina ${sessionStorage.getItem("idComputador")} esta com ${dadosProcessador.Uso}% de uso`)

        } else if (dado >= 85 ) {
          myChart.data.datasets[0].borderColor= ["#FF0000"];
          myChart.data.datasets[0].backgroundColor= ["#FF0000"];
          messagemSlack(`ALERTA!!! Cuidado o processador da maquina ${sessionStorage.getItem("idComputador")} esta com ${dadosProcessador.Uso}% de uso`)
        }
      });
      myChart.update();
    }
  }, 4000);
}

// async function plotarGrafico3(idGrafico) {
//   const ctx = document.getElementById(idGrafico).getContext("2d");
//   let myChart = new Chart(ctx, {
//     type: "line",

//     data: {
//       labels: ["Horario", "Horario", "Horario", "Horario"],
//       datasets: [
//         {
//           label: "Desempenho",
//           data: [0],
//           backgroundColor: [
//             "#31C1E130",
//             "#11FBA760",
//             "#31C1E130",
//             "#11FBA760",
//             "#31C1E130",
//           ],
//           borderColor: ["#31C1E1", "#11FBA7"],
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
  
//   setInterval(async () => {
//     if (myChart.data.datasets[0].data.length == 5) {
//       myChart.data.datasets[0].data.shift();
//     }
//     const dadosProcessador = await getDataLogProcessador();
    
//     myChart.data.datasets[0].data.push(await dadosProcessador.Frequencia / Math.pow(10,9));
//     myChart.update();
//   }, 4000);
// }
