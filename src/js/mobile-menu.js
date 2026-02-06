const header = document.querySelector("#header");
const burger = document.querySelector("#burger");
const menu = document.querySelector("#menu");

let isMenuOpen = false;

const isMobile = () => window.matchMedia("(max-width: 1300px)").matches;

const openMenu = () => {
  burger.classList.add("open");
  menu.classList.add("open");
  isMenuOpen = true;
};

const closeMenu = () => {
  burger.classList.remove("open");
  menu.classList.remove("open");
  isMenuOpen = false;
};

const toggleMenu = () => {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
};

const handleHeaderClick = (e) => {
  if (!isMobile()) return;

  const clickedBurger = e.target.closest("#burger");
  const clickedAnchor = e.target.closest("[data-anchor]");

  if (clickedBurger) {
    toggleMenu();
  }

  if (clickedAnchor) {
    closeMenu();
  }
};

const handleResize = () => {
  if (!isMobile() && isMenuOpen) {
    closeMenu();
  }
};

header.addEventListener("click", handleHeaderClick);
window.addEventListener("resize", handleResize);
