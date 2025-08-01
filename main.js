import "normalize.css";
import "./fonts.scss";
import "./index.scss";

document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector(".header__burger");
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

class CustomRange {
  constructor(element) {
    this.range = element;
    this.track = element.querySelector(".form__range-track");
    this.fill = element.querySelector(".form__range-fill");
    this.thumb = element.querySelector(".form__range-thumb");
    this.percentElement = element
      .closest(".form__range-label")
      .querySelector(".form__range-percent");

    this.isDragging = false;
    this.currentValue = 75;

    this.init();
  }

  init() {
    this.updateValue(this.currentValue);
    this.bindEvents();
  }

  bindEvents() {
    this.range.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    document.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.range.addEventListener("touchstart", this.onTouchStart.bind(this));
    document.addEventListener("touchmove", this.onTouchMove.bind(this));
    document.addEventListener("touchend", this.onTouchEnd.bind(this));

    this.track.addEventListener("click", this.onTrackClick.bind(this));
  }

  onMouseDown(e) {
    this.isDragging = true;
    this.updateFromEvent(e);
  }

  onMouseMove(e) {
    if (this.isDragging) {
      this.updateFromEvent(e);
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }

  onTouchStart(e) {
    this.isDragging = true;
    this.updateFromEvent(e.touches[0]);
  }

  onTouchMove(e) {
    if (this.isDragging) {
      e.preventDefault();
      this.updateFromEvent(e.touches[0]);
    }
  }

  onTouchEnd() {
    this.isDragging = false;
  }

  onTrackClick(e) {
    this.updateFromEvent(e);
  }

  updateFromEvent(e) {
    const rect = this.range.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    this.updateValue(Math.round(percentage));
  }

  updateValue(value) {
    this.currentValue = value;
    this.fill.style.width = `${value}%`;
    this.thumb.style.left = `${value}%`;
    this.percentElement.textContent = `${value}%`;
    this.range.setAttribute("data-value", value);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const rangeElement = document.querySelector(".form__range");
  if (rangeElement) {
    new CustomRange(rangeElement);
  }
});
