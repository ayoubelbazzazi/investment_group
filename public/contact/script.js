import "../common/cursor.js";
import "../common/phonenav.js";
import "../common/header.js";

import { loading } from "../common/loading.js";
const body = document.querySelector("body");
const separator = document.querySelector("#separator");
const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");
const button = document.querySelector("#submit-button");
const headings = document.querySelectorAll(".heading");
const navigationLinks = document.querySelectorAll("nav a"),
  logo = document.getElementById("header-logo");
const transitionContainerOut = document.querySelector("#page-transition-out");

window.scrollTo({ top: 0, behavior: "smooth" });

let first_visit;

// page transition params

window.addEventListener("load", () => {
  first_visit = loading();
  renderAnimation()
});

// reload params

navigationLinks.forEach((item) => {
  if (item.innerText !== "About Us") {
    return;
  }
  item.addEventListener("click", () => {
    setTimeout(() => {
      location.reload();
    }, [700]);
  });
});

logo.addEventListener("click", () => {
  setTimeout(() => {
    location.reload();
  }, [700]);
});

window.addEventListener("popstate", () => {
  if (window.location.href.includes("contact/index.html#")) return;
  setTimeout(() => {
    location.reload();
  }, [700]);
});

separator.style.height = `${body.getBoundingClientRect().height}px`;
window.addEventListener("resize", () => {
  separator.style.height = `${body.getBoundingClientRect().height}px`;
});

function renderAnimation() {
  gsap.set(headings, {
    y: 50,
  });

  gsap.to(headings, {
    opacity: 1,
    y: 0,
    delay: first_visit ? 3.2 : 1.3,
  });
}

inputs.forEach((input, i) => {
  input.addEventListener("focus", () => {
    if (input.value !== "") {
      return;
    }
    gsap.to(labels[i], {
      y: -labels[i].getBoundingClientRect().height,
      scale: 0.8,
      duration: 0.2,
    });
  });
  input.addEventListener("blur", () => {
    if (input.value !== "") {
      return;
    }
    gsap.to(labels[i], {
      y: 0,
      scale: 1,
      duration: 0.2,
    });
  });
});

button.addEventListener("click", (e) => {
  e.preventDefault();
});

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

barba.init({
  transitions: [
    {
      name: "opacity-transition",
      async leave(data) {
        transitionContainerOut.classList.add("leave");
        await delay(1000);
        return;
      },
    },
  ],
});
