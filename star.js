
// star.js
window.onload = () => {
  // ⭐ 個別評価用
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

      // ホバー
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

      // クリック
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

  // ⭐ 一覧画面用
  function createStarDisplay(starCount) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (starCount >= i) stars += "★";
      else if (starCount >= i - 0.5) stars += "★"; // 半分も★
      else stars += "☆";
    }
    return stars;
  }

  // サンプルレビュー
  const reviews = [
    { title: "君の名は", star: 4.5 },
    { title: "天気の子", star: 3 },
    { title: "千と千尋", star: 5 },
  ];

  const listContainer = document.getElementById("review-list") || document.getElementById("output");

  // レビュー一覧に表示
  reviews.forEach((review) => {
    const item = document.createElement("div");
    item.className = "review-item";
    item.innerHTML = `
      <h3>${review.title}</h3>
      <p>${createStarDisplay(review.star)}</p>
    `;
    listContainer.appendChild(item);
  });

  // 最初に個別星も表示
  createStars();
};