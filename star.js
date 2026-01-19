
// ⭐ 一覧画面用（★ここは外！！）
function createStarDisplay(starCount) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (starCount >= i) stars += "★";
    else if (starCount >= i - 0.5) stars += "★";
    else stars += "☆";
  }
  return stars;
}

document.addEventListener("DOMContentLoaded", () => {
  const starContainer = document.getElementById("star-rating");
  const starInput = document.getElementById("star");

  if (!starContainer || !starInput) return;

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
      else fill.style.width = "0%";

      star.addEventListener("mousemove", (e) => {
        const rect = star.getBoundingClientRect();
        const x = e.clientX - rect.left;
        fill.style.width = x < rect.width / 2 ? "50%" : "100%";
      });

      star.addEventListener("mouseleave", () => {
        if (starInput.value >= i) fill.style.width = "100%";
        else if (starInput.value >= i - 0.5) fill.style.width = "50%";
        else fill.style.width = "0%";
      });

      star.addEventListener("click", (e) => {
        const rect = star.getBoundingClientRect();
        const x = e.clientX - rect.left;
        starInput.value = x < rect.width / 2 ? i - 0.5 : i;
        createStars(starInput.value);
      });

      star.appendChild(fill);
      starContainer.appendChild(star);
    }
  }

  createStars();
});