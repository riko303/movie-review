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

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
let editingIndex = null;

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
    p.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function showReviews() {
  const output = document.getElementById("output");
  output.innerHTML = "";

  reviews.forEach((r, index) => {
    const div = document.createElement("div");
    div.className = "review";

    const title = document.createElement("h3");
    title.textContent = r.title;
    div.appendChild(title);

    const stars = document.createElement("p");
    stars.textContent = createStarDisplay(r.star || 0);
    div.appendChild(stars);

    const memo = document.createElement("p");
    memo.textContent = r.memo;
    div.appendChild(memo);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️ 編集";
    editBtn.onclick = () => editReview(index);
    div.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑 削除";
    delBtn.onclick = () => deleteReview(index);
    div.appendChild(delBtn);

    output.appendChild(div);
  });
}



function editReview(index) {
  const r = reviews[index];

  titleInput.value = r.title;
  memoInput.value = r.memo;

  editingIndex = index;
  showPage("write");
}

function deleteReview(index) {
  if (!confirm("この感想を削除する？")) return;

  reviews.splice(index, 1);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  showReviews();
}

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

function showMovie(movie) {
  const posterArea = document.getElementById("poster-area");

  if (!posterArea) return;

  posterArea.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="ポスター">
    <p>${movie.title}</p>
  `;
}

document.getElementById("listBtn").onclick = () => {
  showReviews();
  showPage("list");
};

});

