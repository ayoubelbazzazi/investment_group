const aboutContainer = document.getElementById("about-container");
const header = document.querySelector("header");
const sliderPhone = document.getElementById("slider-phone");
let scrollPos = 0;

const headerAnimation = () => {
  const topAbout = aboutContainer?.getBoundingClientRect().top;
  const vidDim = document
    .querySelector(".video-container")
    ?.getBoundingClientRect();
  const slideDim = sliderPhone?.getBoundingClientRect();
  if (scrollPos > document.body.getBoundingClientRect().top) {
    header.classList.add("hide");
  } else {
    if (
      (aboutContainer &&
        Math.abs(topAbout) < 10 &&
        window.innerWidth >= 1024) ||
      (vidDim &&
        (Boolean(vidDim.top > 0 && vidDim.top < window.innerHeight) ||
          Boolean(vidDim.bottom > 0 && vidDim.bottom < window.innerHeight))) ||
      (slideDim &&
        (Boolean(slideDim.top > 0 && slideDim.top < window.innerHeight) ||
          Boolean(slideDim.bottom > 0 && slideDim.bottom < window.innerHeight)))
    ) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
  }
  scrollPos = document.body.getBoundingClientRect().top;
};

window.addEventListener("scroll", headerAnimation);
