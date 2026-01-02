console.log("📦 script.js 動いてる！");
document.getElementById("saveBtn").addEventListener("click", saveReview);

function saveReview() {
  const title = titleInput.value;
  const memo = memoInput.value;
  const star = parseFloat(starInput.value);

  if (!title || !memo) {
    alert("作品名と感想を入れてね！");
    return;
  }

  if (editingIndex === null) reviews.push({ title, memo, star });
  else {
    reviews[editingIndex] = { title, memo, star };
    editingIndex = null;
  }

  saveToStorage();
  titleInput.value = "";
  memoInput.value = "";
  starInput.value = "5";

  createStars();
  showReviews();
}