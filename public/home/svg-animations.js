const hoverSvg = document.querySelectorAll(".hover-svg");
const svgDrawings = gsap.utils.toArray(".svg-drawing");

import { drawing_animation, kill_animation } from "./helpers.js";

let user = localStorage.getItem("user");
let first_visit = true;

if (user) {
  const visit_date = new Date(JSON.parse(localStorage.getItem("user")).date);
  const now = new Date();
  const time_diff = new Date(now - visit_date);
  if (time_diff.getMinutes() <= 10) {
    first_visit = false;
  }
}


hoverSvg.forEach((element, i) => {
  element.addEventListener("mouseenter", () => {
    svgDrawings.forEach((drawing, j) => {
      if (i !== j) {
        gsap.to(drawing, {
          display: "none",
          duration: 0,
        });
        return;
      }
      gsap.to(drawing, {
        display: "block",
        duration: 0,
      });
      drawing_animation(i);
    });
  });
  element.addEventListener("mouseleave", () => {
    kill_animation(i);
  });
});

document.addEventListener("mouseover", (e) => {
  const classlist = Array.from(e.target.classList);
  if (classlist.includes("no-show-svg-1")) {
    return;
  }
  if (window.innerWidth < 768) {
    return;
  }
  svgDrawings.forEach((drawing, i) => {
    if (i !== 0) {
      gsap.to(drawing, {
        display: "none",
        duration: 0,
      });
      return;
    }
    gsap.to(drawing, {
      display: "block",
      duration: 0,
    });
  });
});

// Initial rendering animation parameters

const heading = gsap.utils.selector("#heading");
const headingDesktop = gsap.utils.selector("#heading-desktop");
const headingDesktopSpans = headingDesktop("span");
const headingSpans = heading("span");
const coordinates = gsap.utils.selector("#coordinates");
const coordinatesSpan = coordinates("span");

const initialRenderingArray = [
  coordinatesSpan,
  headingDesktopSpans,
  "#paragraph",
  "#watch-video",
  "#scroll-container",
  "#scrollTo",
];

initialRenderingArray.forEach((item) => {
  gsap.to(item, {
    y: 50,
    opacity: 0,
    duration: 0,
  });
});

const renderingAnimation = (item, delay, stagger) => {
  if (stagger) {
    gsap.to(item, {
      y: 0,
      opacity: 1,
      stagger: stagger,
      delay: delay,
    });
    return;
  }
  gsap.to(item, {
    y: 0,
    opacity: 1,
    delay: delay,
  });
};

gsap.to(headingSpans, {
  y: 50,
  duration: 0,
});

renderingAnimation(coordinatesSpan, first_visit ? 2.8 : 1, 0.1);
renderingAnimation(headingSpans, first_visit ? 2.8 : 1, 0.1);
renderingAnimation(headingDesktopSpans, first_visit ? 2.8 : 1, 0.1);

renderingAnimation("#paragraph", first_visit ? 3.3 : 1.5);
renderingAnimation("#watch-video", first_visit ? 3.5 : 1.7);
renderingAnimation("#scroll-container", first_visit ? 3.5 : 1.7);
renderingAnimation("#scrollTo", first_visit ? 3.5 : 2);

// Marquee animation parameters

const marquee = gsap.utils.selector(".marquee");
const marquee_items = marquee("p");
let marqueeLength = marquee_items[0].getBoundingClientRect().width;

gsap.to(marquee_items, {
  x: -1 * marqueeLength,
  duration: 10,
  ease: "none",
  repeat: -1,
});

// Slide animations parameters

let currentSlide = 1;

const slideContainer = gsap.utils.selector(".slide-container-1");
const slides = slideContainer(".slide");
slides.forEach((slide) => {
  gsap.to(slide, {
    x: -1 * slide.getBoundingClientRect().width,
    duration: 0,
  });
});

const moveSlides = gsap.utils.toArray(".move-slide");
moveSlides.forEach((moveSlide, i) => {
  moveSlide.addEventListener("click", () => {
    const slide_width = slides[0].getBoundingClientRect().width;
    if (i === 0) {
      if (currentSlide === 1) {
        gsap.to(slides, {
          keyframes: [
            { x: 0, duration: 0.5, ease: "easeIn" },
            { x: -3 * slide_width, duration: 0, ease: "easeIn" },
          ],
        });
        currentSlide = 3;
        return;
      }
      gsap.to(slides, {
        x: -1 * (currentSlide - 1) * slide_width,
        duration: 0.5,
      });
      currentSlide = currentSlide - 1;
    }
    if (i === 1) {
      if (currentSlide === 3) {
        gsap.to(slides, {
          keyframes: [
            { x: -4 * slide_width, duration: 0.5, ease: "easeIn" },
            { x: -1 * slide_width, duration: 0, ease: "easeIn" },
          ],
        });
        currentSlide = 1;
        return;
      }
      gsap.to(slides, {
        x: -1 * (currentSlide + 1) * slide_width,
        duration: 0.5,
      });
      currentSlide = currentSlide + 1;
    }
  });
});

// invert color parameters

const invertArray = ["body", "br", "header", ".invert-color"];

invertArray.forEach((item) => {
  gsap.to(item, {
    scrollTrigger: {
      trigger: ".invert-color-trigger",
      start: "top 20%",
      onLeaveBack: () => {
        gsap.to(item, {
          color: "#f6f3ed",
          background: "#101010",
          borderColor: "#f6f3ed",
        });
      },
      onEnter: () => {
        gsap.to(item, {
          background: "#f6f3ed",
          color: "#101010",
          borderColor: "#101010",
        });
      },
    },
  });
});

gsap.to(".logo", {
  scrollTrigger: {
    trigger: ".invert-color-trigger",
    start: "top 20%",
    onEnter: () => {
      gsap.to(".logo", {
        filter: "invert(100%)",
      });
    },
    onLeaveBack: () => {
      gsap.to(".logo", {
        filter: "invert(0%)",
      });
    },
  },
});

gsap.to(".logo", {
  scrollTrigger: {
    trigger: ".restore-color-trigger",
    start: "top 20%",
    onEnter: () => {
      gsap.to(".logo", {
        filter: "invert(0%)",
      });
    },
    onLeaveBack: () => {
      gsap.to(".logo", {
        filter: "invert(100%)",
      });
    },
  },
});

gsap.to(".invert-color-2", {
  scrollTrigger: {
    trigger: ".invert-color-trigger",
    start: "top 20%",
    onEnter: () => {
      gsap.to(".invert-color-2", {
        background: "#101010",
      });
    },
    onLeaveBack: () => {
      gsap.to(".invert-color-2", {
        background: "#f6f3ed",
      });
    },
  },
});

invertArray.forEach((item) => {
  gsap.to(item, {
    scrollTrigger: {
      trigger: ".restore-color-trigger",
      start: "top 0%",
      onEnter: () => {
        gsap.to(item, {
          color: "#f6f3ed",
          background: "#101010",
          borderColor: "#f6f3ed",
        });
      },
      onLeaveBack: () => {
        gsap.to(item, {
          background: "#f6f3ed",
          color: "#101010",
          borderColor: "#101010",
        });
      },
    },
  });
});

gsap.to(".invert-color-2", {
  scrollTrigger: {
    trigger: ".restore-color-trigger",
    start: "top 0%",
    onEnter: () => {
      gsap.to(".invert-color-2", {
        background: "#f6f3ed",
      });
    },
    onLeaveBack: () => {
      gsap.to(".invert-color-2", {
        background: "#101010",
      });
    },
  },
});
