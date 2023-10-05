const lenis = new Lenis();
const scrollDown = document.querySelector(".scroll-down");

lenis.on("scroll", (e) => {
  e.options.duration = 0;
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// scrollDown.addEventListener("click", () => {
//   lenis.scrollTo("#scrollTo", {duration:2, offset:-1*window.innerHeight * 0.3})
// })

// scrollDown.addEventListener("click", () => {
//   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//   document.querySelector("#scroll-container", { behavior: "smooth" });
// });
