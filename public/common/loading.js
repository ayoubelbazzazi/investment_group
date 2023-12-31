const loadingSVG = gsap.utils.selector("#logo-container");
let x = document.querySelector("#logo-container");
let y = document.querySelector("#acronym");
const acronym = loadingSVG("#acronym");
const logoText = loadingSVG("#logo-text");
const loadingStatus = document.getElementById("loading-status");

const loadingAnimation = () => {
  // Loading animation parameters

  const timeline = gsap.timeline();

  gsap.set("#page-transition", {
    display: "none",
    duration: 0.5,
  });

  timeline
    .to(acronym, {
      display: "block",
      x:
        x.getBoundingClientRect().width / 2 -
        y.getBoundingClientRect().width / 2,
      duration: 0,
    })
    .to(logoText, {
      x: -x.getBoundingClientRect().width / 5,
      duration: 0,
    })
    .to(acronym, {
      opacity: 1,
      duration: 0.5,
    })
    .to(acronym, {
      x: 0,
      delay: 0.5,
    })
    .to(logoText, {
      display: "block",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      x: 0,
      delay: -0.5,
      opacity: 1,
    })
    .to(".loading-container", {
      y: "-100vh",
      delay: 1.5,
      ease: "easeIn",
    })
    .to("#loading-container", {
      display: "none",
    });

  // Loading status parameters

  const progress = loadingStatus.querySelector("#progress");

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function transformer(i) {
    return (1 / 100) * Math.exp(i / 9 - 5 / 4);
  }

  const progressCalculator = async () => {
    let begin = new Date();
    for (let i = 1; i <= 100; i++) {
      await delay(transformer(i));
      progress.innerText = `${i}%`;
    }
  };
  progressCalculator();
};

// page transition parameters

const transitionContainer = document.getElementById("page-transition");
const loadingContainer = document.getElementById("loading-container");

const pageTransition = () => {
  loadingContainer.classList.add("hide");
  transitionContainer.classList.add("enter");

  setTimeout(() => {
    transitionContainer.classList.add("hidden");
  }, 2000);
};

// loading params

export const loading = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    localStorage.setItem("user", JSON.stringify({ date: new Date() }));
    loadingAnimation();
    return true;
  }

  if (user) {
    const visit_date = new Date(JSON.parse(localStorage.getItem("user")).date);
    const now = new Date();
    const time_diff = new Date(now - visit_date);
    if (time_diff.getMinutes() > 10) {
      loadingAnimation();
      localStorage.setItem("user", JSON.stringify({ date: now }));
      return true;
    } else {
      pageTransition();
      return false;
    }
  }
};
