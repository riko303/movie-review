function loadReviews() {
  const data = localStorage.getItem("reviews");
  return data ? JSON.parse(data) : [];
}

function saveReviews(reviews) {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}