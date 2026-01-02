let reviews = [];
let editingIndex = null;

try {
  const saved = localStorage.getItem("reviews");
  if (saved) reviews = JSON.parse(saved);
} catch {
  localStorage.clear();
  reviews = [];
}

function saveToStorage() {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}