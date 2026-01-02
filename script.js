alert("reviewsの中身：" + JSON.stringify(reviews));

let reviews = loadReviews();
let editingIndex = null;

function saveReview() {
  const title = document.getElementById("title").value;
  const memo = document.getElementById("memo").value;
  const star = parseFloat(document.getElementById("star").value);

  if (!title || !memo) {
    alert("作品名と感想を入れてね！");
    return;
  }

  const review = { title, memo, star };

  if (editingIndex === null) {
    reviews.push(review);
  } else {
    reviews[editingIndex] = review;
    editingIndex = null;
  }

  saveReviews(reviews);
  clearForm();
  showReviews();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("memo").value = "";
  document.getElementById("star").value = "5";
  createStars(5);
}

function deleteReview(index) {
  reviews.splice(index, 1);
  saveReviews(reviews);
  showReviews();
}

function editReview(index) {
  const r = reviews[index];
  document.getElementById("title").value = r.title;
  document.getElementById("memo").value = r.memo;
  document.getElementById("star").value = r.star;
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

    const starP = document.createElement("p");
    starP.textContent = `評価：${r.star}`;
    div.appendChild(starP);

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

showReviews();