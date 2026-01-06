let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
let editingIndex = null;

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function saveReview() {
  const title = titleInput.value;
  const memo = memoInput.value;

  if (!title || !memo) {
    alert("作品名と感想を入れてね！");
    return;
  }

  reviews.push({ title, memo });

  // ⭐ これが超大事！！
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // 入力リセット
  titleInput.value = "";
  memoInput.value = "";
}

function showReviews() {
  const output = document.getElementById("output");
  output.innerHTML = "";

  reviews.forEach(r => {
    const div = document.createElement("div");
    div.textContent = `${r.title}：${r.memo}`;
    output.appendChild(div);
  });
}

document.getElementById("listBtn").onclick = () => {
  showReviews();
  showPage("list");
};

function saveAndBack() {
  saveReview();
  showPage("home");
}

const titleInput = document.getElementById("title");
const memoInput = document.getElementById("memo");

document.getElementById("plusBtn").onclick = () => showPage("write");

const watchBy = document.getElementById("watchBy");
const other = document.getElementById("watchByOther");

watchBy.addEventListener("change", () => {
  other.style.display = watchBy.value === "other" ? "block" : "none";
});