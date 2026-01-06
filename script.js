
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
let editingIndex = null;

/* ===== ページ切り替え ===== */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });
  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  // ホームに戻ったら編集状態を解除
  if (id === "home") {
    editingIndex = null;
    const backBtn = document.getElementById("backButton");
    if (backBtn) backBtn.style.display = "none";
  }
}

/* ===== フォーム初期化 ===== */
function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("memo").value = "";
  document.getElementById("star").value = "5";
  createStars(5);
  document.getElementById("watchBy").value = "";
  document.getElementById("watchByOther").value = "";
  document.getElementById("watchByOther").style.display = "none";
}

/* ===== 保存処理 ===== */
function saveReview() {
  const title = document.getElementById("title").value;
  const memo = document.getElementById("memo").value;
  const star = parseFloat(document.getElementById("star").value);
  const dateInput = document.getElementById("date").value;
  const date = dateInput || new Date().toLocaleDateString();

  const watchBy = document.getElementById("watchBy").value;
  const watchByOther = document.getElementById("watchByOther").value;

  if (!title || !memo) {
    alert("作品名と感想を入れてね！");
    return;
  }

  const reviewData = {
    title,
    memo,
    star,
    date,
    watchBy,
    watchByOther
  };

  if (editingIndex === null) {
    reviews.push(reviewData);
  } else {
    reviews[editingIndex] = reviewData;
    editingIndex = null;
  }

  localStorage.setItem("reviews", JSON.stringify(reviews));
  clearForm();
  showReviews();
}

/* ===== 保存して戻る ===== */
function saveAndBack() {
  saveReview();
  showPage("home");
}

/* ===== 一覧表示 ===== */
function showReviews() {
  const output = document.getElementById("output");
  output.innerHTML = "";

  reviews.forEach((r, index) => {
    const div = document.createElement("div");
    div.className = "review";

    div.innerHTML = `
      <h3>${r.title}</h3>
      <p>📅 見た日：${r.date}</p>
      <p>⭐ 評価：${r.star}</p>
      <p>🎬 見た方法：${r.watchBy === "other" ? r.watchByOther : r.watchBy}</p>
      <p>${r.memo}</p>
    `;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏ 編集";
    editBtn.onclick = () => editReview(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑 削除";
    delBtn.onclick = () => deleteReview(index);

    div.appendChild(editBtn);
    div.appendChild(delBtn);
    output.appendChild(div);
  });
}

/* ===== 削除 ===== */
function deleteReview(index) {
  reviews.splice(index, 1);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  showReviews();
}

/* ===== 編集 ===== */
function editReview(index) {
  const r = reviews[index];
  document.getElementById("title").value = r.title;
  document.getElementById("memo").value = r.memo;
  document.getElementById("star").value = r.star;
  document.getElementById("date").value = r.date || "";
  document.getElementById("watchBy").value = r.watchBy || "";
  document.getElementById("watchByOther").value = r.watchByOther || "";
  document.getElementById("watchByOther").style.display =
    r.watchBy === "other" ? "block" : "none";

  createStars(r.star);
  editingIndex = index;

  const backBtn = document.getElementById("backButton");
  if (backBtn) backBtn.style.display = "block";

  showPage("write");
}

/* ===== 見た方法「その他」切り替え ===== */
const watchBySelect = document.getElementById("watchBy");
const otherInput = document.getElementById("watchByOther");

if (watchBySelect && otherInput) {
  watchBySelect.addEventListener("change", () => {
    if (watchBySelect.value === "other") {
      otherInput.style.display = "block";
    } else {
      otherInput.style.display = "none";
      otherInput.value = "";
    }
  });
}

/* ===== 初期表示 ===== */
showReviews();