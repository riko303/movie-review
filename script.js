// ⭐ 一覧用 星表示（グローバル）
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

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  let editingIndex = null;

  const titleInput = document.getElementById("title");
  const memoInput = document.getElementById("memo");

  document.getElementById("plusBtn").onclick = () => showPage("write");
  document.getElementById("listBtn").onclick = () => {
    showReviews();
    showPage("list");
  };

  function saveReview() {
    const title = titleInput.value;
    const memo = memoInput.value;
    const star = parseFloat(document.getElementById("star").value);

    if (!title || !memo) {
      alert("作品名と感想を入れてね！");
      return;
    }

    if (editingIndex === null) {
      reviews.push({ title, memo, star });
    } else {
      reviews[editingIndex] = { title, memo, star };
      editingIndex = null;
    }

    localStorage.setItem("reviews", JSON.stringify(reviews));
    titleInput.value = "";
    memoInput.value = "";
  }

  function showPage(id) {
    document.querySelectorAll(".page").forEach(p => {
      p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  function showReviews() {
    const output = document.getElementById("output");
    output.innerHTML = "";

    reviews.forEach((r, index) => {
      const div = document.createElement("div");
      div.className = "review";

      div.innerHTML = `
        <h3>${r.title}</h3>
        <p>${createStarDisplay(r.star || 0)}</p>
        <p>${r.memo}</p>
        <button onclick="editReview(${index})">✏️ 編集</button>
        <button onclick="deleteReview(${index})">🗑 削除</button>
      `;

      output.appendChild(div);
    });
  }

  // HTMLから呼ぶ用
  window.saveAndBack = function () {
    saveReview();
    showPage("home");
  };

  window.editReview = function (index) {
    const r = reviews[index];
    titleInput.value = r.title;
    memoInput.value = r.memo;
    document.getElementById("star").value = r.star;
    editingIndex = index;
    showPage("write");
  };

  window.deleteReview = function (index) {
    if (!confirm("この感想を削除する？")) return;
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    showReviews();
  };

});