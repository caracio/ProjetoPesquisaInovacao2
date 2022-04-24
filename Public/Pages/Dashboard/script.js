// ==========temperatura=============
function plotarGrafico(idGrafico) {
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
}

// ==========memoria ram=============

function gerarDadosMemoriaRam() {
  dados = [];
  for (let index = 0; index < 5; index++) {
    dados.push((Math.random() * 100).toFixed(0));
  }
  return dados;
}

function gerarDatasMemoriaRam() {
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
}

// <==============memoria em massa==================>

function plotarGrafico2(idGrafico) {
  const ctx = document.getElementById(idGrafico).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: gerarDatasVelocidade(),
      datasets: [
        {
          label: "Desempenho",
          data: gerarDadosVelocidade(),
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
}

// ===========velocidade==============

function plotarGrafico3(idGrafico) {
  const ctx = document.getElementById(idGrafico).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: gerarDatasVelocidade(),
      datasets: [
        {
          label: "Desempenho",
          data: gerarDadosVelocidade(),
          backgroundColor: ["#31C1E130", "#11FBA760"],
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
}

function gerarDadosVelocidade() {
  dados = [];
  for (let index = 0; index < 2; index++) {
    dados.push((Math.random() * 100).toFixed(0));
  }
  return dados;
}

function gerarDatasVelocidade() {
  datas = [];
  for (let index = 0; index < 2; index++) {
    datas.push(
      (Math.random() * 23).toFixed(0) +
        ":" +
        (Math.random() * 59).toFixed(0) +
        ":" +
        (Math.random() * 59).toFixed(0)
    );
  }
  return datas.sort();
}

// <==============uso da cpu==================>

function plotarGrafico4(idGrafico) {
  const ctx = document.getElementById(idGrafico).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",

    data: {
      labels: gerarDatasUsoCpu(),
      datasets: [
        {
          label: "Desempenho",
          data: gerarDadosUsoCpu(),
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
}

function gerarDadosUsoCpu() {
  dados = [];
  for (let index = 0; index < 8; index++) {
    dados.push((Math.random() * 100).toFixed(0));
  }
  return dados;
}

function gerarDatasUsoCpu() {
  datas = [];
  for (let index = 0; index < 8; index++) {
    datas.push(
      (Math.random() * 23).toFixed(0) +
        ":" +
        (Math.random() * 59).toFixed(0) +
        ":" +
        (Math.random() * 59).toFixed(0)
    );
  }
  return datas.sort();
}

//  ===============menu hamburger =================

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
