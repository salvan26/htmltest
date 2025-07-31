import "normalize.css";
import "./fonts.scss";
import "./index.scss";

document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector(".burger-menu");
  const headerMenu = document.querySelector(".header__menu");

  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
    headerMenu.classList.toggle("active");
  });

  const menuButtons = document.querySelectorAll(".header__menu .button");
  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      burgerMenu.classList.remove("active");
      headerMenu.classList.remove("active");
    });
  });
});
