const expandCursor = document.querySelectorAll(".expand-cursor");

document.addEventListener("mousemove", (e) => {
    gsap.to("#pointer", {
      top: e.clientY,
      left: e.clientX,
      duration: 0.3,
      ease: "easeIn",
    });
  });
  
  window.addEventListener("scroll", (e) => {
    gsap.to("#pointer", {
      top: e.pageY,
      left: e.pageX,
      duration: 0,
    });
  });
  
  const hideCustomCursor = () => {
    const element = document.getElementById("pointer");
    if (/Android|webOS|iPhone|iPad/i.test(navigator.userAgent)) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  };
  
  hideCustomCursor();
  window.addEventListener("resize", hideCustomCursor);
  
  window.addEventListener("mouseover", (e) => {
    if (!Array.from(e.target.classList).includes("expand-cursor")) {
      gsap.to("#pointer", {
        width: "45px",
        height: "45px",
        duration: 0.2,
      });
    }
  });
  
  expandCursor.forEach((element) => {
    element.addEventListener("mouseover", () => {
      gsap.to("#pointer", {
        width: "80px",
        height: "80px",
        duration: 0.2,
      });
    });
  });