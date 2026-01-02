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

    star.addEventListener("mousemove", e => {
      const x = e.clientX - star.getBoundingClientRect().left;
      fill.style.width = x < 16 ? "50%" : "100%";
    });

    star.addEventListener("click", e => {
      const x = e.clientX - star.getBoundingClientRect().left;
      starInput.value = x < 16 ? i - 0.5 : i;
      createStars(starInput.value);
    });

    star.appendChild(fill);
    starContainer.appendChild(star);
  }
}