/* function plotarGrafico(idGrafico) {
  const ctx = document.getElementById(idGrafico).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",

    data: {
      labels: gerarDatas(),
      datasets: [
        {
          label: "Desempenho",
          data: gerarDados(),
          backgroundColor: "#31C1E140",
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
}

function gerarDados() {
  dados = [];
  for (let index = 0; index < 5; index++) {
    dados.push((Math.random() * 100).toFixed(0));
  }
  return dados;
}

function gerarDatas() {
  datas = [];
  for (let index = 0; index < 5; index++) {
    datas.push(
      (Math.random() * 23).toFixed(0) +
        ":" +
        (Math.random() * 59).toFixed(0) +
        ":" +
        (Math.random() * 59).toFixed(0)
    );
  }
  return datas.sort();
} */

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span: nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span: nth-child(2)").classList.toggle("active");
});
