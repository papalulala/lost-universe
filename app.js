const items = [
  {id:'key', title:'藍膠帶鑰匙', tag:'搬家後留下的東西',
    story:'搬家那天，我用藍膠帶把這把鑰匙和新家的分開。三年來，我一直把兩把掛在一起。\n\n上週經過那棟樓，大門已經換成刷卡的了。回家才發現，鑰匙圈上只剩新家的那把。',
    reply:'我也留著一把。偶爾拿錯，才想起以前回家要先把門往上抬一點。'},
  {id:'postcard', title:'沒寄出的明信片', tag:'寫到一半的東西',
    story:'明信片上只有一句「我今天走到海邊了」。原本想等浪小一點，再補一句海是什麼顏色。\n\n退房那天，我把它夾進床邊的旅遊手冊。回家整理行李時，才摸到口袋裡的郵票。',
    reply:'我在舊書裡撿過一張。背面只寫了星期二。'},
  {id:'film', title:'半卷底片', tag:'搬家後留下的東西',
    story:'最後一張是搬家前的廚房。冰箱搬走以後，牆上有一塊比四周還白的長方形。\n\n那卷拍到一半的底片，我記得放在窗台上。新家拆完最後一箱，我才想起那扇窗。',
    reply:'我家也有那樣一塊白牆。冰箱上的磁鐵倒是全帶走了。'},
  {id:'spoon',title:'舊家的湯匙',tag:'搬家後留下的東西',story:'這把湯匙碰到碗邊，會響很輕的一聲。搬走後第一次煮湯，我在新家的抽屜裡翻了兩遍，才想起它還晾在舊家的水槽旁。'},
  {id:'button',title:'四孔鈕扣',tag:'衣袋裡的東西',story:'媽媽把備用鈕扣縫在大衣內側，用的是一截比較粗的線。送洗回來，線還在，四個孔裡卻什麼也沒有了。'},
  {id:'ticket',title:'沒有剪角的車票',tag:'離開後才發現',story:'我從衣袋摸出回程票，擱在椅袋裡的報紙旁。下車只帶走報紙，直到站務員伸出手，我才想起椅袋裡還有一張票。'},
  {id:'comb',title:'少一齒的梳子',tag:'離開後才發現',story:'梳子少了第五齒，梳到耳後時總會卡一下。離開旅館後我在車窗上看見頭髮翹起來，才想起浴室架上的它。'},
  {id:'notebook',title:'夾著書籤的筆記本',tag:'做到一半的東西',story:'我在最後一頁畫了一個還沒合起來的圓。圖書館關門時，把書籤夾回那頁。隔天回去，窗邊已經有人坐了，桌上只有他自己的書。'},
  {id:'umbrella',title:'繫帶鬆了的傘',tag:'離開後才發現',story:'雨停後我把傘橫擱在站牌下的長椅上。直到下一場雨，我才想起那條怎麼拉都拉不緊的繫帶。'},
  {id:'tape',title:'沒錄完的錄音帶',tag:'做到一半的東西',story:'錄到一半，門外有人叫我吃飯。後來我收起錄音機，忘了那盒卡帶還躺在窗邊，停在一句「等一下」。'},
  {id:'stamp',title:'刻了一半的印章',tag:'做到一半的東西',story:'我的名字刻到第三刀，手一滑，多留了一道斜線。工作室清空後，我才發現帶回來的是刻刀，印章留在木屑裡。'},
  {id:'eraser',title:'紙套翹起的橡皮擦',tag:'衣袋裡的東西',story:'我總用拇指把紙套的角壓平。放學跑回家，手伸進制服口袋，裡面只剩一小片擦下來的紙。'}
];

const trails = {
  key:['搬家後留下的東西','film','spoon'],
  postcard:['做到一半的東西','notebook','tape'],
  film:['做到一半的東西','postcard','tape'],
  spoon:['搬家後留下的東西','key','film'],
  button:['衣袋裡的東西','eraser','ticket'],
  ticket:['離開後才發現','comb','umbrella'],
  comb:['離開後才發現','ticket','umbrella'],
  notebook:['做到一半的東西','stamp','postcard'],
  umbrella:['離開後才發現','comb','ticket'],
  tape:['做到一半的東西','film','notebook'],
  stamp:['做到一半的東西','notebook','tape'],
  eraser:['衣袋裡的東西','button','ticket']
};
const byId = new Map(items.map((item,index) => [item.id,{...item,number:String(index+1).padStart(2,'0')}]));
const objects = document.querySelector('#objects');
const entries = new Map();
const visited = new Set();
const modelModule = import('./scene.js?v=twelve').catch(() => null);
let current;
let pinned = false;
let nextFrame;

function reveal(entry, lock = false) {
  pinned = Boolean(entry && lock);
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

function mount(item,index) {
  const article = document.createElement('article');
  article.className = 'floating';
  article.innerHTML = `
    <button class="object-button" type="button" aria-expanded="false" aria-controls="story-${item.id}">
      <span class="model" aria-hidden="true"></span>
      <img class="model-still" alt="" src="./${item.id}.png">
      <span class="object-id" aria-hidden="true">${item.number}</span>
    </button>
    <p class="glimpse" aria-hidden="true"></p>
    <section class="object-info" id="story-${item.id}" inert>
      <h2></h2><p></p>
      <details><summary>背面的話</summary><p></p><small>示範留言</small></details>
      <a class="story-link">這件失物的連結</a>
      <button type="button" class="follow"></button>
    </section>`;
  const button = article.querySelector('button');
  const info = article.querySelector('.object-info');
  const modelScope = new AbortController();
  const entry = {article,button,info,modelScope};
  button.setAttribute('aria-label',item.title);
  article.querySelector('h2').textContent = item.title;
  article.querySelector('.glimpse').textContent = item.title + ' · ' + item.story.split('。')[0] + '。';
  info.querySelector('p').textContent = item.story;
  info.querySelector('details').hidden = !item.reply;
  info.querySelector('details p').textContent = item.reply ?? '';
  const [label,...neighbors] = trails[item.id];
  const follow = info.querySelector('.follow');
  follow.textContent = '沿著線索走 · ' + label;
  follow.onclick = () => {
    render([item.id,...neighbors],item.id);
    entries.get(item.id).button.focus();
  };
  article.querySelector('a').href = '#' + item.id;
  entries.set(item.id,entry);
  objects.append(article);
  article.addEventListener('pointerenter',event => {
    if (event.pointerType === 'mouse' && !pinned) article.classList.add('near');
  });
  article.addEventListener('pointerleave',event => {
    if (event.pointerType === 'mouse') article.classList.remove('near');
  });
  button.addEventListener('click',event => {
    reveal(current === entry ? undefined : entry,true);
  });
  article.addEventListener('keydown',event => {
    if (event.key === 'Escape' && current === entry) {
      button.focus();
      reveal();
    }
  });
  const {signal} = modelScope;
  modelModule.then(module => module?.floatModel(article.querySelector('.model'),article.querySelector('img'),item.id,index,signal)).catch(() => {});
}

function render(ids, selected) {
  reveal();
  for (const [id,entry] of entries) {
    if (ids.includes(id)) continue;
    entry.modelScope.abort();
    entry.article.remove();
    entries.delete(id);
  }
  for (const [index,id] of ids.entries()) {
    visited.add(id);
    const existing = entries.get(id);
    if (existing) objects.append(existing.article);
    else mount(byId.get(id),index);
  }
  reveal(entries.get(selected),Boolean(selected));
  if (!selected && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nextFrame?.cancel();
    nextFrame = objects.animate([{opacity:.1,filter:'blur(10px)'},{opacity:1,filter:'blur(0)'}],{duration:650,easing:'ease-out'});
  }
}

document.addEventListener('pointerdown',event => {
  if (current && !current.article.contains(event.target) && !event.target.closest('.floating')) reveal();
});
function route() {
  const id = location.hash.slice(1);
  if (entries.has(id)) reveal(entries.get(id),true);
  else if (byId.has(id)) render([id,...trails[id].slice(1)],id);
  else render(['key','postcard','film']);
}
addEventListener('hashchange',route);
route();
document.querySelector('#drift').onclick = () => {
  const unseen = items.filter(item => !visited.has(item.id));
  const elsewhere = items.filter(item => visited.has(item.id) && !entries.has(item.id));
  render([...unseen,...elsewhere].slice(0,3).map(item => item.id));
};
const indexPanel = document.querySelector('#catalog');
const search = indexPanel.querySelector('input');
const results = indexPanel.querySelector('ul');
function filterIndex() {
  const term = search.value.trim();
  const matches = [...byId.values()].filter(item => [item.title,item.number,item.tag,trails[item.id][0]].some(value => value.includes(term)));
  results.replaceChildren(...matches.map(item => {
    const row = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#' + item.id;
    link.textContent = item.number + '　' + item.title;
    link.onclick = () => {
      indexPanel.close();
      if (location.hash === link.hash) route();
    };
    row.append(link);
    return row;
  }));
  indexPanel.querySelector('output').textContent = matches.length ? '' : '沒有找到符合的失物。';
}
search.addEventListener('input',filterIndex);
document.querySelector('#open-catalog').onclick = () => {
  filterIndex();
  indexPanel.showModal();
  search.focus();
};


