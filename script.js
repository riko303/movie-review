let reviews = [];
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
    alert("入れてね！");
    return;
  }

  reviews.push({ title, memo });
}

function saveAndBack() {
  saveReview();
  showPage("home");
}

const titleInput = document.getElementById("title");
const memoInput = document.getElementById("memo");

document.getElementById("plusBtn").onclick = () => showPage("write");
document.getElementById("listBtn").onclick = () => showPage("list");

const watchBy = document.getElementById("watchBy");
const other = document.getElementById("watchByOther");

watchBy.addEventListener("change", () => {
  other.style.display = watchBy.value === "other" ? "block" : "none";
});