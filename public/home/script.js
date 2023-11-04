import "./svg-animations.js";
import "../common/cursor.js";
import "../common/phonenav.js";
import "../common/header.js";

const scrollDown = document.querySelector(".scroll-down");
const scrollTo = document.querySelector("#scrollTo");
const navigationLinks = document.querySelectorAll("nav a");
const transitionContainerOut = document.querySelector("#page-transition-out");
const backToTop = document.getElementById("back-to-top")


let showVideo;

// user status

// reload params

navigationLinks.forEach((item) => {
  if (item.innerText === "Contact" || item.innerText === "About Us") {
    item.addEventListener("click", () => {
      setTimeout(() => {
        location.reload();
      }, [700]);
    });
  }
});

window.addEventListener("popstate", () => {
  setTimeout(() => {
    location.reload();
  }, [700]);
});

scrollDown.addEventListener("click", () => {
  scrollTo.scrollIntoView({ behavior: "smooth" });
});

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

// page transition controls

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

// Back to the top

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
