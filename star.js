document.addEventListener("DOMContentLoaded", () => {
  const starContainer = document.getElementById("star-rating");
  const starInput = document.getElementById("star");

  function createStars(value = 5) {
    starContainer.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = "star";
      star.textContent = "★";

      const fill = document.createElement("span");
      fill.className = "fill";
      fill.textContent = "★";

      if (value >= i) fill.style.width = "100%";
      else if (value >= i - 0.5) fill.style.width = "50%";

      star.appendChild(fill);
      starContainer.appendChild(star);
    }
  }

  createStars();
});