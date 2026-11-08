const surfaces = {
  key:['膠帶',/cloth tape|tape corner/i],
  postcard:['明信片紙面',/^Warped postcard paper/],
  film:['底片罐的外殼',/^Crimped metal cartridge/],
  spoon:['匙碗',/^Pressed concave bowl/],
  button:['鈕扣盤面',/^Recessed four-hole button/],
  ticket:['車票紙面',/^Thin card ticket/],
  comb:['梳背',/^Rounded pocket comb/,[-1.23,1.23,.015,.29]],
  notebook:['筆記本封面',/^Rounded cloth cover/],
  umbrella:['束起的傘面',/^Pleated folded umbrella canopy/],
  tape:['錄音帶盒面',/^Cassette shell/],
  stamp:['印章的橡皮印面',/^Rubber printing face/],
  eraser:['橡皮擦的紙套',/^Thin folded paper sleeve|^Lifted sleeve corner/],
  mirror:['手鏡的鏡面',/^Recessed mirror glass/],
  bookmark:['書籤的紙面',/^Folded bookmark paper/],
  envelope:['信封的背面與封口',/^Folded envelope back|^Torn open flap/],
  luggage:['行李牌的地址卡',/^Recessed luggage label/],
  earbuds:['左耳的外殼',/^Earbud housing left/],
  pencil:['鉛筆的木桿',/^Short hexagonal pencil barrel/],
  thimble:['頂針的外壁',/^Hollow tapered thimble/],
  watch:['手錶的錶面',/^Stopped watch dial/],
  matchbox:['火柴盒的外套',/^Printed matchbox sleeve/],
  glasses:['眼鏡的鏡片',/^Round spectacle lens/],
  mitten:['手套的手掌布面',/^Rounded knitted mitten palm/],
  bell:['車鈴的圓蓋',/^Rounded bicycle bell dome/],
  spool:['線軸上的棉線',/^Wound cotton thread/],
  whistle:['哨子的外殼',/^Rounded whistle body/],
  coin:['硬幣的幣面',/^Worn coin face/],
  clothespin:['衣夾的上半片木面',/^Upper wooden jaw/],
  pencap:['筆蓋的外壁',/^Fountain pen cap barrel/],
  safetypin:['別針的扣頭',/^Folded safety pin clasp/],
  shoehorn:['鞋拔的弧面',/^Curved shoehorn shell/],
  domino:['骨牌的點數面',/^Worn domino face/],
  bottlecap:['瓶蓋的頂面',/^Crimped bottle cap crown/],
  teaball:['濾茶球的金屬外殼',/^Perforated tea ball shell/],
  shuttle:['織梭的木殼',/^Polished wooden shuttle hull/],
  doorstop:['門擋的橡膠斜面',/^Scuffed rubber door wedge/],
  harmonica:['口琴的上蓋',/^Rounded harmonica cover/],
  curtainring:['窗簾掛環的外圈',/^Worn brass curtain ring/],
  dater:['日期章的握柄',/^Turned date stamp handle/],
  magnifier:['放大鏡的鏡面',/^Round pocket magnifier lens/],
  darner:['補襪木蛋的曲面',/^Turned wooden darning egg/],
  pedal:['踏板外側的橡膠',/^Outer rubber pedal block/],
  measure:['捲尺露出的尺帶',/^Extended measuring ribbon/],
  yoyo:['溜溜球的兩側木面',/^Turned wooden yo-yo cheek/],
  teatin:['茶罐的金屬外壁',/^Rounded tea tin body/],
  padlock:['掛鎖的金屬鎖身',/^Worn brass padlock body/],
  castanets:['響板的木殼',/^Carved wooden castanet shell/],
  cankey:['開罐匙的金屬柄',/^Slotted can opener stem/],
  clothesbrush:['衣刷的木背',/^Curved wooden clothes brush back/],
  hairclip:['髮夾的弧形夾面',/^Curved hair clip face/],
  plugfuse:['保險絲的瓷頭',/^Glazed porcelain fuse crown/],
  slingshot:['彈弓的木柄',/^Natural forked slingshot handle/],
  travelcup:['摺疊杯的金屬外圈',/^Telescoping travel cup ring/],
  bikepump:['打氣筒的筒身',/^Portable pump barrel/],
  shoelast:['鞋楦的木面',/^Carved wooden shoe last/],
  deskbell:['櫃檯鈴的圓頂',/^Pressed desk bell dome/],
  compass:['指南針的刻度盤',/^Recessed compass dial/]
};

export function mountInk(article, item, signal) {
  const endpoint = document.querySelector('meta[name="echo-endpoint"]').content;
  const url = new URL('drawing/' + item.id,endpoint);
  const [label,matcher,region] = surfaces[item.id];
  const panel = document.createElement('details');
  panel.className = 'ink-panel';
  panel.innerHTML = `
    <summary>為失物上色</summary>
    <p>在畫板上畫幾筆，圖案會貼到${label}。</p>
    <canvas width="256" height="256" aria-label="${label}塗鴉畫板"></canvas>
    <div class="ink-tools">
      <label>筆色 <input type="color" value="#486365"></label>
      <label>粗細 <input type="range" min="2" max="28" value="8"></label>
    </div>
    <button type="button" data-undo>復原</button>
    <button type="button" data-clear>清空畫板</button>
    <button type="button" data-reset>還原公開圖案</button>
    <p role="status"></p>
    <button type="button" data-save>公開這幅塗鴉</button>`;
  article.querySelector('.story-trails').before(panel);
  const canvas = panel.querySelector('canvas');
  const ctx = canvas.getContext('2d',{willReadFrequently:true});
  if (!ctx) return;
  const model = article.querySelector('.model');
  model.inkCanvas = canvas;
  model.inkSurface = {matcher,region};
  const status = panel.querySelector('[role=status]');
  const color = panel.querySelector('[type=color]');
  const width = panel.querySelector('[type=range]');
  const undo = panel.querySelector('[data-undo]');
  const clear = panel.querySelector('[data-clear]');
  const reset = panel.querySelector('[data-reset]');
  const save = panel.querySelector('[data-save]');
  let state;
  let busy = true;
  let dirty = false;
  let pointer;
  const snapshots = [];

  function refreshTexture() {
    model.dispatchEvent(new Event('inkchange'));
  }
  function blank() {
    ctx.fillStyle = '#fffefa';
    ctx.fillRect(0,0,256,256);
  }
  function update() {
    canvas.classList.toggle('ready',!busy && Boolean(state));
    save.disabled = busy || !dirty;
    reset.disabled = busy || !dirty;
    clear.disabled = busy || !state;
    undo.disabled = busy || !snapshots.length;
  }
  function remember() {
    snapshots.push({image:ctx.getImageData(0,0,256,256),dirty});
    if (snapshots.length > 12) snapshots.shift();
  }
  async function apply(next) {
    let image;
    if (next.png) {
      image = new Image();
      image.src = 'data:image/png;base64,' + next.png;
      await image.decode();
    }
    if (signal.aborted) return;
    state = next;
    blank();
    if (image) ctx.drawImage(image,0,0,256,256);
    snapshots.length = 0;
    dirty = false;
    refreshTexture();
  }
  function point(event) {
    const rect = canvas.getBoundingClientRect();
    return [(event.clientX-rect.left)*256/rect.width,(event.clientY-rect.top)*256/rect.height];
  }
  function stroke(from,to) {
    ctx.strokeStyle = color.value;
    ctx.lineWidth = Number(width.value);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(...from);
    ctx.lineTo(...to);
    ctx.stroke();
    refreshTexture();
  }
  canvas.addEventListener('pointerdown',event => {
    if (busy || !state || pointer || !event.isPrimary || event.button !== 0) return;
    remember();
    const xy = point(event);
    pointer = {id:event.pointerId,xy};
    canvas.setPointerCapture(event.pointerId);
    stroke(xy,[xy[0]+.01,xy[1]]);
    dirty = true;
    update();
  },{signal});
  canvas.addEventListener('pointermove',event => {
    if (pointer?.id !== event.pointerId) return;
    const xy = point(event);
    stroke(pointer.xy,xy);
    pointer.xy = xy;
  },{signal});
  for (const type of ['pointerup','pointercancel','lostpointercapture']) {
    canvas.addEventListener(type,event => {
      if (pointer?.id === event.pointerId) pointer = undefined;
    },{signal});
  }
  undo.onclick = () => {
    const previous = snapshots.pop();
    ctx.putImageData(previous.image,0,0);
    dirty = previous.dirty;
    refreshTexture();
    update();
  };
  clear.onclick = () => {
    remember();
    blank();
    dirty = true;
    refreshTexture();
    update();
  };
  reset.onclick = async () => {
    busy = true;
    update();
    try { await apply(state); }
    finally { busy = false; update(); }
  };
  save.onclick = async () => {
    if (save.disabled || pointer) return;
    busy = true;
    update();
    try {
      const png = canvas.toDataURL('image/png').split(',')[1];
      const response = await fetch(url,{
        method:'POST',signal,headers:{'Content-Type':'application/json'},
        body:JSON.stringify({revision:state.revision,png})
      });
      if (response.status === 409) {
        state = await response.json();
        status.textContent = '有人剛公開新圖案。可先還原公開圖案，或再次送出以保留你的版本。';
      } else if (response.status === 429) {
        status.textContent = '先等一會兒，再公開這幅塗鴉。';
      } else {
        if (!response.ok) throw Error();
        await apply(await response.json());
        status.textContent = '已公開。下一位訪客也會看見這幅塗鴉。';
      }
    } catch {
      if (!signal.aborted) status.textContent = '這幅塗鴉還沒送出，請稍後再試。';
    } finally {
      busy = false;
      update();
    }
  };
  async function load() {
    busy = true;
    update();
    try {
      const response = await fetch(url,{signal,cache:'no-store'});
      if (!response.ok) throw Error();
      await apply(await response.json());
      status.textContent = state?.png ? '你可以接著畫，也可以清空後重畫。' : '畫板還是空白的。';
    } catch {
      if (!signal.aborted) status.textContent = '暫時讀不到公開圖案，稍後再打開畫板試試。';
    } finally {
      busy = false;
      update();
    }
  }
  panel.addEventListener('toggle',() => { if (panel.open && !busy && !dirty) load(); },{signal});
  blank();
  load();
}










