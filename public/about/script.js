import "../common/cursor.js";
import "../common/phonenav.js";
import "../common/header.js";
import "../common/videocontrols.js";

import { loading } from "../common/loading.js";

const aboutContainer = document.querySelector(".about-container"),
  slideControlsContainer = document.querySelector(".slider-controls-1"),
  sliderControls1 = Array.from(
    document.querySelector(".slider-controls-1").children
  ),
  slides1 = document.querySelectorAll(".slide-1"),
  toggleChooseYear = document.querySelector(".toggle-choose-year"),
  chooseYear = document.querySelector(".choose-year"),
  years = Array.from(document.querySelector(".choose-year").children),
  abouts = document.querySelectorAll(".about"),
  yeartext = document.querySelector(".year-text"),
  yearIcon = document.querySelector(".year-icon"),
  rotatePhone = document.querySelector(".rotate-phone"),
  navigationLinks = document.querySelectorAll("nav a"),
  logo = document.getElementById("header-logo"),
  backToTop = document.getElementById("back-to-top"),
  transitionContainerOut = document.querySelector("#page-transition-out");

// page transition params

let first_visit;

window.addEventListener("load", () => {
  first_visit = loading();
  renderAnimation();
});

// reload params

navigationLinks.forEach((item) => {
  if (item.innerText !== "Contact") {
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

window.addEventListener("popstate", (e) => {
  if (window.location.href.includes("about/index.html#")) return;
  setTimeout(() => {
    location.reload();
  }, [500]);
});

// Slider params

sliderControls1.forEach((element, i) => {
  element.addEventListener("click", () => {
    sliderControls1.forEach((item, j) => {
      const inactiveClasses = [
        "border-solid",
        "border-background",
        "border-[1px]",
      ];
      if (i === j) {
        item.classList.add("bg-background");
        inactiveClasses.forEach((Class) => {
          item.classList.remove(Class);
        });
      } else {
        item.classList.remove("bg-background");
        inactiveClasses.forEach((Class) => {
          item.classList.add(Class);
        });
      }
    });
    gsap.to(slides1, {
      x: -1 * i * slides1[0].getBoundingClientRect().width,
    });
  });
});

toggleChooseYear.addEventListener("click", () => {
  const yearText = ["2021", "2022", "2023"];
  if (Array.from(chooseYear.classList).includes("hidden")) {
    yearIcon.classList.remove("fa-chevron-down");
    yearIcon.classList.add("fa-chevron-up");

    chooseYear.classList.add("block");
    chooseYear.classList.remove("hidden");
    abouts.forEach((about) => {
      about.classList.add("hidden");
    });
    return;
  }
  yearIcon.classList.add("fa-chevron-down");
  yearIcon.classList.remove("fa-chevron-up");
  chooseYear.classList.remove("block");
  chooseYear.classList.add("hidden");

  const yearSpanText = toggleChooseYear.querySelector("span").innerText;
  const about_index = yearText.indexOf(yearSpanText);
  abouts[about_index].classList.remove("hidden");
});

years?.forEach((element, i) => {
  const yearText = ["2021", "2022", "2023"];
  element.addEventListener("click", () => {
    yeartext.innerText = yearText[i];
    yearIcon.classList.add("fa-chevron-down");
    yearIcon.classList.remove("fa-chevron-up");
    if (i === 0) {
      slideControlsContainer.classList.remove("hidden");
    } else {
      slideControlsContainer.classList.add("hidden");
    }
    if (i === 1) {
      aboutContainer.classList.add("bg-[#eab651]");
      aboutContainer.classList.remove("bg-primary");
    } else {
      aboutContainer.classList.remove("bg-[#eab651]");
      aboutContainer.classList.add("bg-primary");
    }
    chooseYear.classList.remove("block");
    chooseYear.classList.add("hidden");
    abouts.forEach((item, j) => {
      if (i === j) {
        item.classList.remove("hidden");
        return;
      }
    });
  });
});

// rortate phone params

function rotate_phone() {
  if (window.innerHeight < 500) {
    rotatePhone.classList.remove("hidden");
    aboutContainer.classList.add("hidden");
  } else {
    rotatePhone.classList.add("hidden");
    aboutContainer.classList.remove("hidden");
  }
}

rotate_phone();

window.addEventListener("resize", rotate_phone);

// Horizontal scrolling

const aboutContainerDesktop = document.getElementById("about-container");
const sections = gsap.utils.toArray(".section");

const isVisible = () => {
  const section = document.querySelectorAll(".section"[3]);
  const visible = section.offsetWidth > 0 && section.offsetHeight > 0;
  if (visible) {
    return true;
  } else {
    return false;
  }
};

gsap.to(sections, {
  x: -1 * (aboutContainerDesktop.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: "#about-container",
    pin: true,
    scrub: 1,
    end: "+=2000",
  },
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

// Initial render animation

function renderAnimation() {
  const coordinates = gsap.utils.selector("#coordinates");
  const coordinatesSpan = coordinates("span");

  gsap.set(coordinatesSpan, {
    y: 50,
    opacity: 0,
    duration: 0,
  });

  gsap.set("#heading", {
    y: 50,
    opacity: 0,
    duration: 0,
  });

  gsap.to(coordinatesSpan, {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    delay: first_visit ? 3.5 : 1,
  });

  gsap.to("#heading", {
    y: 0,
    opacity: 1,
    delay: first_visit ? 3.2 : 1,
  });
}

// back to top

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
