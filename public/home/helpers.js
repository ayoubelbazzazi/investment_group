// Animation 1 parameters

const drawing = gsap.utils.selector(".svg-drawing");
const circles = drawing("circle");
const animation_1_1 = gsap.to(circles[0], {
  keyframes: [
    { attr: { cx: 60 }, duration: 0.2, delay: 0.5 },
    { attr: { cx: 40 }, duration: 0.2, delay: 0.2 },
  ],
  repeat: -1,
  repeatDelay: 2,
  paused: true,
});
const animation_1_2 = gsap.to(circles[1], {
  keyframes: [
    { attr: { cx: 40 }, duration: 0.2, delay: 0.5 },
    { attr: { cx: 60 }, duration: 0.2, delay: 0.2 },
  ],
  repeat: -1,
  repeatDelay: 2,
  paused: true,
});

// Animation 2 parameters

const drawing2 = gsap.utils.selector(".svg-drawing-2");
const paths = drawing2(".path");

const t_2_1 = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.5 });
t_2_1
  .fromTo(
    paths[0],
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      duration: 1,
    }
  )
  .fromTo(
    paths[1],
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      duration: 1,
    }
  )
  .to(paths[0], {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
  })
  .to(paths[1], {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
  })
  .to(paths[0], {
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    duration: 1,
  })
  .to(paths[1], {
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    duration: 1,
    delay: -1,
  })
  .to(paths[0], {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
  })
  .to(paths[1], {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    delay: -1,
  });

// Animation 3 parameters

const drawing3 = gsap.utils.selector(".svg-drawing-3");
const paths_3 = drawing3("path");
const animations_3 = [];

paths_3.forEach((path, i) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  const animation = gsap.to(path, {
    keyframes: [
      {
        strokeDashoffset: 0,
        duration: 1.5,
      },
      { strokeDashoffset: length, duration: 1.5, delay: 2 },
    ],
    repeat: -1,
    repeatDelay: 2,
    paused: true,
  });
  animations_3.push(animation);
});

const drawing4 = gsap.utils.selector(".svg-drawing-4");
const g = drawing4("g")[0];
const t_4 = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 2 });
t_4
  .fromTo(
    g,
    {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
    }
  )
  .to(g, {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    duration: 2,
    delay: 1,
  });

// fifth animation parameters

const drawing5 = gsap.utils.selector(".svg-drawing-5");
const g_5 = drawing5("g")[0];
const animation_5 = gsap.to(g_5, {
  rotation: 360,
  duration: 1,
  transformOrigin: "center center",
  repeat: -1,
  ease: "none",
  paused: true,
});

// sixth animation parameters

const drawing6 = document.querySelector(".svg-drawing-6");
const paths_6 = drawing6.querySelectorAll("path");
const circles_6 = drawing6.querySelectorAll("circle");
paths_6.forEach((path, i) => {
  const length = path.getTotalLength();
  path.style.strokeDashArray = length;
  path.style.strokeDashOffset = length;
});

const animations_6_1 = [];
const animations_6_2 = [];

paths_6.forEach((path, i) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  const animation = gsap.to(path, {
    keyframes: [
      { strokeDashoffset: 0, duration: 1.5 },
      { strokeDashoffset: length, duration: 1.5, delay: 2 },
    ],
    paused: true,
    repeat: -1,
    repeatDelay: 2,
  });
  animations_6_1.push(animation);
});

circles_6.forEach((circle, i) => {
  if (i === 0) {
    return;
  }
  const circumference = 2 * Math.PI * circle.r.baseVal.value;
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;
  const animation = gsap.to(circle, {
    keyframes: [
      { strokeDashoffset: 0, duration: 1.5 },
      { strokeDashoffset: circumference, duration: 1.5, delay: 2 },
    ],
    paused: true,
    repeat: -1,
    repeatDelay: 2,
  });
  animations_6_2.push(animation);
});

export const drawing_animation = (i) => {
  switch (i) {
    case 0:
      animation_1_1.restart();
      animation_1_2.restart();
      break;
    case 1:
      t_2_1.restart();
      break;
    case 2:
      animations_3.forEach((animation) => {
        animation.restart();
      });
      break;
    case 3:
      t_4.restart();
      break;
    case 4:
      animation_5.restart();
      break;
    case 5:
      animations_6_1.forEach((animation) => {
        animation.restart();
      });
      animations_6_2.forEach((animation) => {
        animation.restart();
      });
  }
};

export const kill_animation = (i) => {
  switch (i) {
    case 0:
      animation_1_1.revert();
      animation_1_2.revert();
      break;
    case 1:
      t_2_1.revert();
      break;
    case 2:
      animations_3.forEach(animation => {
        animation.revert()
      });
      break;
    case 3:
      t_4.revert();
      break;
    case 4:
      animation_5.pause();
      break;
    case 5:
      animations_6_1.forEach((animation) => {
        animation.revert();
      });
      animations_6_2.forEach((animation) => {
        animation.revert();
      });
  }
};
