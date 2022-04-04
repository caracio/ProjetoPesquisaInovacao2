var openMenu = document.querySelector("#show-menu");
var hidenMenuIcon = document.querySelector("#hide-menu");
var sideMenu = document.querySelector("#nav-menu");

openMenu.addEventListener("click", function () {
  sideMenu.classList.add("active");
});

hidenMenuIcon.addEventListener("click", function () {
  sideMenu.classList.remove("active");
});
