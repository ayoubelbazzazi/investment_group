// page transition parameters

const transitionContainer = document.getElementById("page-transition")
const loadingContainer = document.getElementById("loading-container")

export const pageTransition = () => {
  
  loadingContainer.classList.add("hide")
  transitionContainer.classList.add("enter")

  setTimeout(() => {
    transitionContainer.classList.add("hidden")
  }, 2000)
};
