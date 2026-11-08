import { openEcho } from './echo.js';
import { mountInk } from './ink.js?v=twenty-four';

const items = [
  {id:'key', title:'藍膠帶鑰匙', tag:'搬家後留下的東西',
    story:'搬家那天，我用藍膠帶把這把鑰匙和新家的分開。三年來，我一直把兩把掛在一起。\n\n上週經過那棟樓，大門已經換成刷卡的了。回家才發現，鑰匙圈上只剩新家的那把。'},
  {id:'postcard', title:'沒寄出的明信片', tag:'寫到一半的東西',
    story:'明信片上只有一句「我今天走到海邊了」。原本想等浪小一點，再補一句海是什麼顏色。\n\n退房那天，我把它夾進床邊的旅遊手冊。回家整理行李時，才摸到口袋裡的郵票。'},
  {id:'film', title:'半卷底片', tag:'搬家後留下的東西',
    story:'最後一張是搬家前的廚房。冰箱搬走以後，牆上有一塊比四周還白的長方形。\n\n那卷拍到一半的底片，我記得放在窗台上。新家拆完最後一箱，我才想起那扇窗。'},
  {id:'spoon',title:'舊家的湯匙',tag:'搬家後留下的東西',story:'這把湯匙碰到碗邊，會響很輕的一聲。搬走後第一次煮湯，我在新家的抽屜裡翻了兩遍，才想起它還晾在舊家的水槽旁。'},
  {id:'button',title:'四孔鈕扣',tag:'衣袋裡的東西',story:'媽媽把備用鈕扣縫在大衣內側，用的是一截比較粗的線。送洗回來，線還在，四個孔裡卻什麼也沒有了。'},
  {id:'ticket',title:'沒有剪角的車票',tag:'離開後才發現',story:'我從衣袋摸出回程票，擱在椅袋裡的報紙旁。下車只帶走報紙，直到站務員伸出手，我才想起椅袋裡還有一張票。'},
  {id:'comb',title:'少一齒的梳子',tag:'離開後才發現',story:'梳子少了第五齒，梳到耳後時總會卡一下。離開旅館後我在車窗上看見頭髮翹起來，才想起浴室架上的它。'},
  {id:'notebook',title:'夾著書籤的筆記本',tag:'做到一半的東西',story:'我在最後一頁畫了一個還沒合起來的圓。圖書館關門時，把書籤夾回那頁。隔天回去，窗邊已經有人坐了，桌上只有他自己的書。'},
  {id:'umbrella',weather:'rain',title:'繫帶鬆了的傘',tag:'離開後才發現',story:'雨停後我把傘橫擱在站牌下的長椅上。直到下一場雨，我才想起那條怎麼拉都拉不緊的繫帶。'},
  {id:'tape',title:'沒錄完的錄音帶',tag:'做到一半的東西',story:'錄到一半，門外有人叫我吃飯。後來我收起錄音機，忘了那盒卡帶還躺在窗邊，停在一句「等一下」。'},
  {id:'stamp',title:'刻了一半的印章',tag:'做到一半的東西',story:'我的名字刻到第三刀，手一滑，多留了一道斜線。工作室清空後，我才發現帶回來的是刻刀，印章留在木屑裡。'},
  {id:'eraser',title:'紙套翹起的橡皮擦',tag:'衣袋裡的東西',story:'我總用拇指把紙套的角壓平。放學跑回家，手伸進制服口袋，裡面只剩一小片擦下來的紙。'},
  {id:'mirror',title:'袖珍手鏡',tag:'離開後才發現',story:'鏡面有一道細痕，照到右耳時，我總會把鏡子往左偏一下。離開旅館後，我想看一眼頭髮，伸進袋裡的手只碰到空的鏡套。'},
  {id:'bookmark',title:'對摺的書籤',tag:'做到一半的東西',story:'我把書籤對摺，在摺痕旁畫一道鉛筆線，記住故事停在哪一行。還書時忘了抽出它。下次借到同一本書，那一頁平平地攤開，書籤已經不在了。'},
  {id:'envelope',title:'拆封的信封',tag:'離開後才發現',story:'拆信時，我沿著封口撕出一排毛邊。信帶回家了。後來想抄回信地址，才想起信封還擱在郵局的窗台。'},
  {id:'luggage',title:'地址寫了一半的行李牌',tag:'離開後才發現',story:'地址卡寫到門牌前，我就被催著上車。到家才看見行李箱的提把上只剩一道勒痕。幸好還沒寫到門牌。我甚至不知道該不該盼有人撿到。'},
  {id:'earbuds',title:'繞成圈的有線耳機',tag:'做到一半的東西',story:'耳機線在分岔下面繞成一個鬆鬆的圈，我一直懶得理順。磁帶翻面時，我把耳機擱在車窗下。下車後，手裡只有收好的隨身聽。'},
  {id:'pencil',title:'削到握不住的短鉛筆',tag:'衣袋裡的東西',story:'鉛筆短到只能用兩根手指捏著，我還是把它放進制服口袋。放學後想在車票背面記一句話，才發現口袋裡只有橡皮擦屑。'},
  {id:'thimble',title:'縫到一半的頂針',tag:'做到一半的東西',story:'縫到大衣的最後一顆鈕扣，針尖在頂針的小凹點裡卡了一下。門外有人喊我，剩下兩針就先擱著。隔天打開針線盒，才發現頂針還留在那張桌上。'},
  {id:'watch',title:'停在六點十八分的手錶',tag:'離開後才發現',story:'錶早就停在六點十八分，我還是每天戴著。那天為了搬行李，把它解下來擱在車站洗手台。上車後我抬起手腕，才看見錶帶留的一圈淡痕。'},
  {id:'matchbox',title:'還剩三根的火柴盒',tag:'搬家後留下的東西',story:'舊家的爐火點不著時，我總伸手去摸火柴盒。搬家那天，盒裡還有三根。新家第一次煮湯，手伸出去，我才想起它還擱在舊廚房的窗邊。'},
  {id:'glasses',title:'起霧的眼鏡',tag:'離開後才發現',weather:'fog',story:'一進暖的地方，鏡片就白了。我把眼鏡放在窗邊，等霧退一點。車開了，我想擦掉左邊最後一點霧，伸手卻只摸到眼鏡布。'},
  {id:'mitten',title:'落單的手套',tag:'衣袋裡的東西',story:'左手手套的拇指旁補過一針，戴上去總能摸出來。等車時我脫了手套找零錢。回家把兩隻手伸進大衣口袋，只有右手摸到一團毛線。'},
  {id:'bell',title:'有一道刮痕的自行車鈴',tag:'離開後才發現',story:'鈴上那道刮痕，是牽車經過窄門時留下的。送修那天，師傅把鈴拆下來擱在桌角。騎回家的路上，前面有人擋住巷口。我伸拇指去按，只碰到空空的把手。'}
];

const trails = {
  key:['搬家後留下的東西','film','spoon'],
  postcard:['還沒寄出的那句話','envelope','notebook'],
  film:['如果能再多留一格','postcard','tape'],
  spoon:['舊廚房還留著什麼？','matchbox','film'],
  button:['穿過那四個孔的針','thimble','notebook'],
  ticket:['到了下一站，才想起上一站','luggage','comb'],
  comb:['車窗倒影裡少了什麼？','mirror','ticket'],
  notebook:['替讀到一半的地方做記號','bookmark','postcard'],
  umbrella:['一隻手撐傘，另一隻手找零錢','mitten','ticket'],
  tape:['那句「等一下」，有人聽見嗎？','earbuds','film'],
  stamp:['第三刀之後，還有一筆','notebook','tape'],
  eraser:['口袋裡剩下的一點碎屑','pencil','button'],
  mirror:['雨停了，玻璃上還留著什麼？','glasses','umbrella'],
  bookmark:['翻到還沒讀完的那一頁','notebook','tape'],
  envelope:['地址還能從哪裡找回來？','postcard','ticket'],
  luggage:['提把上的勒痕，手腕上的淡痕','watch','ticket'],
  earbuds:['手比耳朵更早記得的聲音','bell','tape'],
  pencil:['鉛筆寫過的地方，還留著什麼？','eraser','button'],
  thimble:['留在原地的線與筆跡','button','notebook'],
  watch:['上車後，才發現少了一樣','luggage','ticket'],
  matchbox:['手伸向舊廚房的窗邊','spoon','key'],
  glasses:['在鏡子和車窗之間','mirror','comb'],
  mitten:['藏在拇指旁的一針','thimble','button'],
  bell:['本來會響的東西，忽然沒了聲音','earbuds','tape']
};
const keyChoices = [
  {label:'最後一次回頭看',destination:'film',companion:'notebook',arrival:'搬走前，有人替空下來的廚房拍了最後一張照片。'},
  {label:'手還記得它在哪裡',destination:'spoon',companion:'comb',arrival:'到了新家，煮湯時還是伸手去拉原本那一格抽屜。'}
];
const byId = new Map(items.map(item => [item.id,item]));
const driftOrder = [...byId.keys()].reverse();
const objects = document.querySelector('#objects');
const frame = document.querySelector('#frame');
let weatherScene = '';
const entries = new Map();
const visited = new Set();
const modelModule = import('./scene.js?v=twenty-one').catch(() => null);
let current;
let pinned = false;
let returnToKey;

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
  article.className = 'floating emerging';
  article.addEventListener('animationend', event => {
    if (event.animationName === 'fog-drift') article.classList.remove('emerging');
  });
  article.style.setProperty('--fog-delay', `${index * 130}ms`);
  article.dataset.item = item.id;
  article.innerHTML = `
    <button class="object-button" type="button" aria-expanded="false" aria-controls="story-${item.id}">
      <span class="model" aria-hidden="true"></span>
      <img class="model-still" alt="" src="./${item.id}.png?v=refined-collection">
    </button>
    <p class="glimpse" aria-hidden="true"></p>
    <section class="object-info" id="story-${item.id}" inert>
      <h2></h2><p></p>
      <button type="button" class="story-link">背面的話</button>
      <div class="story-trails"></div>
    </section>`;
  const button = article.querySelector('button');
  const info = article.querySelector('.object-info');
  const modelScope = new AbortController();
  const entry = {article,button,info,modelScope};
  button.setAttribute('aria-label',item.title);
  article.querySelector('h2').textContent = item.title;
  article.querySelector('.glimpse').textContent = item.title + ' · ' + item.story.split('。')[0] + '。';
  info.querySelector('p').textContent = item.story;
  const [label,...neighbors] = trails[item.id];
  const choices = info.querySelector('.story-trails');
  function action(text, handler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'follow';
    button.textContent = text;
    button.onclick = handler;
    choices.append(button);
  }
  if (item.id === 'key') {
    keyChoices.forEach(choice => action(choice.label,() => chooseKeyTrail(choice)));
  } else {
    action(label,() => {
      render([item.id,...neighbors],item.id);
      entries.get(item.id).button.focus();
    });
    if (keyChoices.some(choice => choice.destination === item.id)) {
      action('回到鑰匙旁',() => {
        render(returnToKey ?? ['key','postcard','film'],'key');
        entries.get('key').info.querySelector('.follow').focus();
      });
    }
  }
  article.querySelector('.story-link').onclick = () => openEcho(item);
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
  mountInk(article,item,signal);
  modelModule.then(module => module?.floatModel(article.querySelector('.model'),article.querySelector('img'),item.id,index,signal)).catch(() => {});
}

function chooseKeyTrail(choice) {
  const ids = Array.from(objects.children,article => article.dataset.item);
  returnToKey ??= ids;
  const others = [choice.destination,choice.companion];
  render(ids.map(id => id === 'key' ? id : others.shift()),undefined,true);
  const entry = entries.get(choice.destination);
  const glimpse = entry.article.querySelector('.glimpse');
  glimpse.textContent = choice.arrival;
  glimpse.removeAttribute('aria-hidden');
  entry.button.setAttribute('aria-describedby',glimpse.id = 'arrival-' + choice.destination);
  entry.article.classList.add('arrived');
  entry.button.focus({preventScroll:true});
  entry.article.scrollIntoView({block:'nearest',behavior:'instant'});
}

function render(ids, selected, branch = false) {
  reveal();
  if (!branch && selected !== 'key') returnToKey = undefined;
  for (const [id,entry] of entries) {
    entry.article.classList.remove('arrived');
    entry.button.removeAttribute('aria-describedby');
    const glimpse = entry.article.querySelector('.glimpse');
    const item = byId.get(id);
    glimpse.textContent = item.title + ' · ' + item.story.split('。')[0] + '。';
    glimpse.setAttribute('aria-hidden','true');
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
  const sceneKey = [...ids].sort().join(',');
  if (sceneKey !== weatherScene) {
    weatherScene = sceneKey;
    const choices = [...new Set(ids.map(id => byId.get(id).weather).filter(Boolean))];
    frame.dataset.weather = choices[Math.floor(Math.random()*choices.length)] ?? 'fog';
  }
}

document.addEventListener('pointerdown',event => {
  if (current && !current.article.contains(event.target) && !event.target.closest('.floating')) reveal();
});
function route() {
  const id = location.hash.slice(1);
  if (entries.has(id)) reveal(entries.get(id),true);
  else if (id === 'key') render(['key','postcard','film'],'key');
  else if (byId.has(id)) render([id,...trails[id].slice(1)],id);
  else render(['key','postcard','film']);
}
addEventListener('hashchange',route);
route();
document.querySelector('#drift').onclick = () => {
  const unseen = driftOrder.filter(id => !visited.has(id));
  const next = unseen.slice(0,3);
  if (next.length < 3) {
    visited.clear();
    for (const id of entries.keys()) visited.add(id);
    next.push(...driftOrder.filter(id => !visited.has(id) && !next.includes(id)).slice(0,3-next.length));
  }
  render(next);
};














