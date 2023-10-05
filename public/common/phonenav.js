const navigationIcon = document.querySelector(".navigation-icon");
const header = document.querySelector("header");
const body = document.querySelector("body");

import {switchNavIcon,
    togglePhoneNavigation} from "./helpers.js"

let open = false;

navigationIcon.addEventListener("click", () => {
  switchNavIcon(open);
  togglePhoneNavigation(open);
  open = !open;
});

const positionNav = () => {
  gsap.to(".navigation-phone", {
    top: header.getBoundingClientRect().bottom,
    height: `${
      window.innerHeight -
      header.getBoundingClientRect().height -
      body.style.paddingTop
    }px`,
  });
  if (window.innerWidth >= 1024) {
    gsap.to(".navigation-phone", {
      display: "none",
    });
    switchNavIcon(true);
  }
};



positionNav();

window.addEventListener("resize", positionNav);
