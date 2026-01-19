document.addEventListener("DOMContentLoaded", () => {
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  let editingIndex = null;

  const titleInput = document.getElementById("title");
  const memoInput = document.getElementById("memo");
  const starInput = document.getElementById("star");
  const output = document.getElementById("output");
  const dateInput = document.getElementById("date");
  const watchBy = document.getElementById("watchBy");
  const watchByOther = document.getElementById("watchByOther");

  const plusBtn = document.getElementById("plusBtn");
  const listBtn = document.getElementById("listBtn");
  const saveBackBtn = document.getElementById("saveBackBtn");

  // ページ切替
  function showPage(id){
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  // 星表示
  function createStarDisplay(starCount){
    let stars = "";
    for(let i=1;i<=5;i++){
      stars += starCount>=i ? "★" : "☆";
    }
    return stars;
  }

  // 保存
  function saveReview(){
    const title = titleInput.value.trim();
    const memo = memoInput.value.trim();
    const star = Number(starInput.value) || 0;
    const checkedTags = Array.from(document.querySelectorAll('#tag-area input:checked')).map(t=>t.value);
    const date = dateInput.value;
    const watch = watchBy.value==='other' ? watchByOther.value : watchBy.value;

    if(!title || !memo){ alert("作品名と感想を入れてね！"); return; }

    const reviewObj = { title, memo, star, tags: checkedTags, date, watch };

    if(editingIndex === null){
      reviews.push(reviewObj);
    } else {
      reviews[editingIndex] = reviewObj;
      editingIndex = null;
    }

    localStorage.setItem("reviews", JSON.stringify(reviews));

    // リセット
    titleInput.value = "";
    memoInput.value = "";
    starInput.value = 5;
    dateInput.value = "";
    watchBy.value = "";
    watchByOther.value = "";
    document.querySelectorAll('#tag-area input').forEach(input=>input.checked=false);
  }

  // 一覧表示
  function showReviews(){
    output.innerHTML = "";
    reviews.forEach((r,i)=>{
      const div = document.createElement("div");
      div.className="review";
      div.innerHTML = `<h3>${r.title}</h3>
                       <p>${createStarDisplay(r.star)}</p>
                       <p>${r.memo}</p>
                       <p>${r.tags.map(t=>'#'+t).join(' ')}</p>
                       <p>📅 ${r.date || ''} | 視聴: ${r.watch || ''}</p>`;
      const editBtn = document.createElement("button");
      editBtn.textContent="✏️ 編集";
      editBtn.onclick = ()=>{
        titleInput.value=r.title;
        memoInput.value=r.memo;
        starInput.value=r.star;
        dateInput.value=r.date || '';
        watchBy.value=['theater','netflix','amazon','kinro','dvd'].includes(r.watch) ? r.watch : 'other';
        watchByOther.value=['theater','netflix','amazon','kinro','dvd'].includes(r.watch) ? '' : r.watch;
        document.querySelectorAll('#tag-area input').forEach(input=>{
          input.checked = r.tags.includes(input.value);
        });
        editingIndex=i;
        showPage("write");
      };
      const delBtn = document.createElement("button");
      delBtn.textContent="🗑 削除";
      delBtn.onclick = ()=>{
        if(!confirm("この感想を削除する？")) return;
        reviews.splice(i,1);
        localStorage.setItem("reviews",JSON.stringify(reviews));
        showReviews();
      };
      div.appendChild(editBtn);
      div.appendChild(delBtn);
      output.appendChild(div);
    });
  }

  // 「その他」表示
  watchBy.addEventListener("change", ()=>{
    watchByOther.style.display = watchBy.value==='other'?'block':'none';
  });

  // ボタン
  plusBtn.onclick = ()=>showPage("write");
  listBtn.onclick = ()=>{ showReviews(); showPage("list"); };
  saveBackBtn.onclick = ()=>{ saveReview(); showPage("home"); };
  document.querySelectorAll(".backHomeBtn").forEach(btn=>btn.onclick=()=>showPage("home"));
});