
document.addEventListener("DOMContentLoaded", () => {
  const starContainer = document.getElementById("star-rating");
  const starInput = document.getElementById("star");

  function createStars(value = 5) {
    // ...（いまの星作る処理）
  }

  function createStarDisplay(starCount) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (starCount >= i) stars += "★";
      else if (starCount >= i - 0.5) stars += "★";
      else stars += "☆";
    }
    return stars;
  }

  const reviews = [
    { title: "君の名は", star: 4.5 },
    { title: "天気の子", star: 3 },
    { title: "千と千尋", star: 5 },
  ];

  const listContainer = document.getElementById("review-list");

  reviews.forEach((review) => {
    const item = document.createElement("div");
    item.innerHTML = `<h3>${review.title}</h3>
                      <p>${createStarDisplay(review.star)}</p>`;
    listContainer.appendChild(item);
  });

  createStars(); // 最初に表示
});