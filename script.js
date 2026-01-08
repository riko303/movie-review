const API_KEY = "5d51c21ec79a66b6eaa6259d7b129a4e";

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
let editingIndex = null;

function searchMovie() {
  const titleInput = document.getElementById("title");
  const title = titleInput.value.trim();
  if (!title) return;

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=APIキー&language=ja-JP&query=${title}`)
    .then(res => res.json())
    .then(data => {
      displayResults(data.results.slice(0, 5));
    });
}

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

  if (editingIndex === null) {
    // 新規保存
    reviews.push({ title, memo });
  } else {
    // ✏️ 上書き保存
    reviews[editingIndex] = { title, memo };
    editingIndex = null;
  }

  localStorage.setItem("reviews", JSON.stringify(reviews));

  titleInput.value = "";
  memoInput.value = "";
}


function showReviews() {
  const output = document.getElementById("output");
  output.innerHTML = "";

  reviews.forEach((r, index) => {
    const div = document.createElement("div");
    div.className = "review";

    const text = document.createElement("p");
    text.textContent = `${r.title}：${r.memo}`;
    div.appendChild(text);

    // ✏️ 編集ボタン
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️ 編集";
    editBtn.onclick = () => editReview(index);
    div.appendChild(editBtn);

    // 🗑 削除ボタン
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

function displayResults(results) {
  resultsDiv.innerHTML = "";

  results.forEach(movie => {
    const div = document.createElement("div");
    div.textContent = `${movie.title} (${movie.release_date?.slice(0,4)})`;
    
    div.onclick = () => selectMovie(movie);
    resultsDiv.appendChild(div);
  });
}

function selectMovie(movie) {
  titleInput.value = movie.title;
  storyInput.value = movie.overview;

  if (movie.poster_path) {
    imageUrlInput.value =
      "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  }
}

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

//test