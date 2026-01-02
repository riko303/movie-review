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

      // 初期表示
      if (value >= i) fill.style.width = "100%";
      else if (value >= i - 0.5) fill.style.width = "50%";
      else fill.style.width = "0%";

      // ⭐ ホバー
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

      // ⭐ クリック
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

  // 最初に表示
  createStars();
});