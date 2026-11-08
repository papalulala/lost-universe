export function mountInk(article, signal) {
  const endpoint = document.querySelector('meta[name="echo-endpoint"]').content;
  const url = new URL('drawing/key',endpoint);
  const panel = document.createElement('details');
  panel.className = 'ink-panel';
  panel.innerHTML = `
    <summary>打開塗鴉畫板</summary>
    <p>在畫板上畫幾筆，圖案會貼到鑰匙的膠帶上。</p>
    <canvas width="256" height="256" aria-label="膠帶塗鴉畫板"></canvas>
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
