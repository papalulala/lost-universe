const items = [
  {id:'key', title:'藍膠帶鑰匙', tag:'搬家後留下的東西',
    story:'搬家那天，我用藍膠帶把這把鑰匙和新家的分開。三年來，我一直把兩把掛在一起。\n\n上週經過那棟樓，大門已經換成刷卡的了。回家才發現，鑰匙圈上只剩新家的那把。',
    reply:'我也留著一把。偶爾拿錯，才想起以前回家要先把門往上抬一點。'},
  {id:'postcard', title:'沒寄出的明信片', tag:'寫到一半的東西',
    story:'明信片上只有一句「我今天走到海邊了」。原本想等浪小一點，再補一句海是什麼顏色。\n\n退房那天，我把它夾進床邊的旅遊手冊。回家整理行李時，才摸到口袋裡的郵票。',
    reply:'我在舊書裡撿過一張。背面只寫了星期二。'},
  {id:'film', title:'半卷底片', tag:'搬家後留下的東西',
    story:'最後一張是搬家前的廚房。冰箱搬走以後，牆上有一塊比四周還白的長方形。\n\n那卷拍到一半的底片，我記得放在窗台上。新家拆完最後一箱，我才想起那扇窗。',
    reply:'我家也有那樣一塊白牆。冰箱上的磁鐵倒是全帶走了。'}
];

const objects = document.querySelector('#objects');
const entries = new Map();
let current;

function reveal(entry) {
  if (current === entry) return;
  if (current) {
    current.article.classList.remove('surfaced');
    current.button.setAttribute('aria-expanded','false');
    current.info.inert = true;
  }
  current = entry;
  if (!entry) return;
  entry.article.classList.add('surfaced');
  entry.button.setAttribute('aria-expanded','true');
  entry.info.inert = false;
}

items.forEach((item,index) => {
  const article = document.createElement('article');
  article.className = 'floating';
  article.innerHTML = `
    <button class="object-button" type="button" aria-expanded="false" aria-controls="story-${item.id}">
      <span class="model" aria-hidden="true"></span>
      <img class="model-still" alt="" src="./${item.id}.png">
      <span class="object-id" aria-hidden="true">0${index+1}</span>
    </button>
    <section class="object-info" id="story-${item.id}" inert>
      <h2></h2><p></p>
      <details><summary>背面的話</summary><p></p><small>示範留言</small></details>
      <a class="story-link">這件失物的連結</a>
    </section>`;
  const button = article.querySelector('button');
  const info = article.querySelector('.object-info');
  const entry = {article,button,info};
  button.setAttribute('aria-label',item.title);
  article.querySelector('h2').textContent = item.title;
  info.querySelector('p').textContent = item.story;
  info.querySelector('details p').textContent = item.reply;
  article.querySelector('a').href = '#' + item.id;
  entries.set(item.id,entry);
  objects.append(article);
  article.addEventListener('pointerenter',event => {
    if (event.pointerType === 'mouse') reveal(entry);
  });
  article.addEventListener('pointerleave',event => {
    if (event.pointerType === 'mouse' && current === entry) reveal();
  });
  button.addEventListener('click',event => {
    if (event.pointerType === 'mouse') { reveal(entry); return; }
    reveal(current === entry ? undefined : entry);
  });
  article.addEventListener('focusout',event => {
    if (!article.contains(event.relatedTarget) && current === entry) reveal();
  });
  article.addEventListener('keydown',event => {
    if (event.key === 'Escape' && current === entry) {
      button.focus();
      reveal();
    }
  });
});

document.addEventListener('pointerdown',event => {
  if (current && !current.article.contains(event.target) && !event.target.closest('.floating')) reveal();
});
function route() {
  reveal(entries.get(location.hash.slice(1)));
}
addEventListener('hashchange',route);
route();
import('./scene.js?v=ink-frame').then(({floatModel}) => {
  items.forEach((item,index) => {
    const article = entries.get(item.id).article;
    floatModel(article.querySelector('.model'),article.querySelector('img'),item.id,index).catch(() => {});
  });
}).catch(() => {});


