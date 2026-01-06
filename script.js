
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
let editingIndex = null;

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
  }
}

const watchBy = document.getElementById("watchBy").value;
const watchByOther = document.getElementById("watchByOther").value;

if (editingIndex === null) {
  reviews.push({
    title,
    memo,
    star,
    date,
    watchBy,
    watchByOther
  });
} else {
  reviews[editingIndex] = {
    title,
    memo,
    star,
    date,
    watchBy,
    watchByOther
  };
  editingIndex = null;
}

document.getElementById("watchBy").value = "";
document.getElementById("watchByOther").value = "";
document.getElementById("watchByOther").style.display = "none";

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("memo").value = "";
  document.getElementById("star").value = "5";
  createStars(5);
}

function deleteReview(index) {
  reviews.splice(index, 1);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  showReviews();
}

function editReview(index) {
  const r = reviews[index];
  document.getElementById("title").value = r.title;
  document.getElementById("memo").value = r.memo;
  document.getElementById("star").value = r.star;
  document.getElementById("date").value = r.date || "";
  createStars(r.star);
  editingIndex = index;
}

function showReviews() {
  const output = document.getElementById("output");
  output.innerHTML = "";

  reviews.forEach((r, index) => {
    const div = document.createElement("div");
    div.className = "review";

    const h3 = document.createElement("h3");
    h3.textContent = r.title;
    div.appendChild(h3);
    
    const dateP = document.createElement("p");
    dateP.textContent = `📅 見た日：${r.date}`;
    div.appendChild(dateP);

    const p = document.createElement("p");
    p.textContent = `評価：${r.star}`;
    div.appendChild(p);

    const memoP = document.createElement("p");
    memoP.textContent = r.memo;
    div.appendChild(memoP);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏ 編集";
    editBtn.onclick = () => editReview(index);
    div.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑 削除";
    delBtn.onclick = () => deleteReview(index);
    div.appendChild(delBtn);

    output.appendChild(div);
  });
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function saveAndBack() {
  saveReview(); // 元の保存関数を呼ぶ
  showPage("home"); // ホーム画面に戻る
}

const plusBtn = document.getElementById("plusBtn");
if (plusBtn) {
  plusBtn.onclick = () => showPage("write");
}

const listBtn = document.getElementById("listBtn");
if (listBtn) {
  listBtn.onclick = () => {
    showReviews();
    showPage("list");
  };
}

function saveAndBack() {
  saveReview();
  showPage("home");
}

const watchBySelect = document.getElementById("watchBy");
const otherInput = document.getElementById("watchByOther");

watchBySelect.addEventListener("change", () => {
  if (watchBySelect.value === "other") {
    otherInput.style.display = "block";
  } else {
    otherInput.style.display = "none";
    otherInput.value = "";
  }
});

document.getElementById("showPage('home')").style.display = "none";
editingIndex = null;

showReviews();

  
