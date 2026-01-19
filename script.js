document.addEventListener("DOMContentLoaded", () => {

  // ===== データ =====
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  let editingIndex = null;

  // ===== 要素取得 =====
  const titleInput = document.getElementById("title");
  const memoInput = document.getElementById("memo");
  const starInput = document.getElementById("star");
  const output = document.getElementById("output");

  const plusBtn = document.getElementById("plusBtn");
  const listBtn = document.getElementById("listBtn");
  const saveBtn = document.getElementById("saveBtn");
  const backBtn = document.getElementById("backBtn");

  // ===== ページ切り替え =====
  function showPage(id) {
    document.querySelectorAll(".page").forEach(p => {
      p.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
  }

  // ===== 星表示 =====
  function createStarDisplay(starCount) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += starCount >= i ? "★" : "☆";
    }
    return stars;
  }

  // ===== 保存 =====
  function saveReview() {
    const title = titleInput.value.trim();
    const memo = memoInput.value.trim();
    const star = Number(starInput.value) || 0;

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
    starInput.value = 0;

    showReviews();
    showPage("home");
  }

  // ===== 一覧表示 =====
  function showReviews() {
    output.innerHTML = "";

    reviews.forEach((r, index) => {
      const div = document.createElement("div");
      div.className = "review";

      div.innerHTML = `
        <h3>${r.title}</h3>
        <p>${createStarDisplay(r.star)}</p>
        <p>${r.memo}</p>
      `;

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️ 編集";
      editBtn.onclick = () => {
        titleInput.value = r.title;
        memoInput.value = r.memo;
        starInput.value = r.star;
        editingIndex = index;
        showPage("write");
      };

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑 削除";
      delBtn.onclick = () => {
        if (!confirm("この感想を削除する？")) return;
        reviews.splice(index, 1);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        showReviews();
      };

      div.appendChild(editBtn);
      div.appendChild(delBtn);
      output.appendChild(div);
    });
  }

  // ===== ボタンイベント =====
  plusBtn.onclick = () => showPage("write");
  listBtn.onclick = () => {
    showReviews();
    showPage("list");
  };
  saveBtn.onclick = saveReview;
  backBtn.onclick = () => showPage("home");

});