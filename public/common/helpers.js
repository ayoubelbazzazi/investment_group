const navigationIcon = document.querySelector(".navigation-icon");

export const switchNavIcon = (open) => {
  const nav = gsap.utils.selector(".navigation-icon");
  const bars = nav(".bar");
  if (open) {
    bars.forEach((bar, i) => {
      if (i === 0) {
        gsap.to(bar, {
          transform: `translateY(0) rotate(0)`,
          duration: 0,
        });
        return;
      }

      gsap.to(bar, {
        transform: `translateY(0) rotate(0)`,
        duration: 0,
      });
    });
    return;
  }
  bars.forEach((bar, i) => {
    if (i === 0) {
      gsap.to(bar, {
        transform: `translateY(${
          navigationIcon.getBoundingClientRect().height / 2 -
          bar.getBoundingClientRect().height / 2
        }px) rotate(-45deg)`,
        duration: 0,
      });
      return;
    }

    gsap.to(bar, {
      transform: `translateY(${
        (-1 * navigationIcon.getBoundingClientRect().height) / 2 +
        bar.getBoundingClientRect().height / 2
      }px) rotate(45deg)`,
      duration: 0,
    });
  });
};

export const togglePhoneNavigation = (open) => {
  const body = document.querySelector("body");
  if (!open) {
    body.classList.add("overflow-hidden");
    gsap.to(".navigation-phone", {
      display: "block",
      y: 0,
    });
    return;
  }
  body.classList.remove("overflow-hidden");

  gsap.to(".navigation-phone", {
    y: "-150vh",
  });
};