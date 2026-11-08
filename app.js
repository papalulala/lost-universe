const items = [
  {id:'key', title:'藍膠帶鑰匙', tag:'搬家後留下的東西', next:'film', trail:'搬家後留下的東西',
    story:'搬家那天，我用藍膠帶把這把鑰匙和新家的分開。三年來，我一直把兩把掛在一起。\n\n上週經過那棟樓，大門已經換成刷卡的了。回家才發現，鑰匙圈上只剩新家的那把。',
    reply:'我也留著一把。偶爾拿錯，才想起以前回家要先把門往上抬一點。'},
  {id:'postcard', title:'沒寄出的明信片', tag:'寫到一半的東西', next:'key', trail:'離開後才發現',
    story:'明信片上只有一句「我今天走到海邊了」。原本想等浪小一點，再補一句海是什麼顏色。\n\n退房那天，我把它夾進床邊的旅遊手冊。回家整理行李時，才摸到口袋裡的郵票。',
    reply:'我在舊書裡撿過一張。背面只寫了星期二。'},
  {id:'film', title:'半卷底片', tag:'搬家後留下的東西', next:'postcard', trail:'做到一半的東西',
    story:'最後一張是搬家前的廚房。冰箱搬走以後，牆上有一塊比四周還白的長方形。\n\n那卷拍到一半的底片，我記得放在窗台上。新家拆完最後一箱，我才想起那扇窗。',
    reply:'我家也有那樣一塊白牆。冰箱上的磁鐵倒是全帶走了。'}
];
const el = id => document.getElementById(id);
let active = 0;
let scene;
function render(open, focus = false) {
  const item = items[active];
  el('serial').textContent = 'LU–00' + (active + 1);
  el('tag').textContent = item.tag;
  el('title').textContent = item.title;
  el('intro').hidden = open;
  el('approach').hidden = open;
  el('detail').hidden = !open;
  el('story').textContent = item.story;
  el('reply').textContent = item.reply;
  el('trail').textContent = '沿著線索走 · ' + item.trail + ' →';
  el('status').textContent = '';
  el('index').querySelectorAll('button').forEach((b,i) => b.setAttribute('aria-current', String(i === active)));
  flip(false);
  if (scene) scene.show(item.id);
  el('still').src = './' + item.id + '.png';
  if (focus) el('title').focus();
}
function flip(back) {
  el('note').hidden = !back;
  el('flip').setAttribute('aria-expanded', String(back));
  el('flip').textContent = back ? '翻回正面 ↺' : '翻到背面 ↻';
  scene?.flip(back);
}
function visit(index) {
  const hash = '#' + items[index].id;
  if (location.hash !== hash) history.pushState(null,'',hash);
  active = index;
  render(true,true);
}
function route() {
  const i = items.findIndex(item => '#' + item.id === location.hash);
  active = Math.max(0,i);
  render(i >= 0);
}
items.forEach((item,i) => {
  const button = document.createElement('button');
  const label = document.createElement('small');
  label.textContent = 'LU–00' + (i + 1);
  button.append(label,item.title);
  button.onclick = () => visit(i);
  el('index').append(button);
});
el('approach').onclick = () => visit(active);
el('flip').onclick = () => flip(el('note').hidden);
el('trail').onclick = () => visit(items.findIndex(item => item.id === items[active].next));
el('drift').onclick = () => {
  const item = items.find((item,i) => i !== active && item.id !== items[active].next);
  visit(items.indexOf(item));
};
el('share').onclick = async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    el('status').textContent = '已複製連結';
  } catch {
    el('status').textContent = '可從網址列複製這件失物的連結';
  }
};
addEventListener('popstate',route);
route();
el('still').hidden = false;
import('./scene.js').then(({ createScene }) => {
  scene = createScene(el('view'),el('still'),el('hint'));
  scene.show(items[active].id);
  scene.flip(!el('note').hidden);
}).catch(() => { el('hint').textContent = '失物影像'; });

