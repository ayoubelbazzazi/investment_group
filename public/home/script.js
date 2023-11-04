import "./svg-animations.js";
import "../common/cursor.js";
import "../common/phonenav.js";
import "../common/header.js";

import { loading } from "../common/loading.js";

const watchVideo = document.getElementById("watch-video");
const videoWrapper = document.getElementById("video-wrapper");
const video = document.querySelector("video");
const videoContainer = document.querySelector(".video-container");
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

// video container parameters

watchVideo.addEventListener("click", async () => {
  showVideo = true;
  const body = document.querySelector("body");
  await import("../common/videocontrols.js");

  videoWrapper.classList.remove("hidden");
  body.classList.add("overflow-hidden");
  videoContainer.classList.add("allow-keyboard-events");
});

videoWrapper.addEventListener("click", (e) => {
  const body = document.querySelector("body");
  if (e.target.id !== "video-wrapper") {
    return;
  }
  videoWrapper.classList.add("hidden");
  body.classList.remove("overflow-hidden");
  videoContainer.classList.remove("allow-keyboard-events");
  video.pause();
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
