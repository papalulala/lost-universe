const palette = {
  white:['紙白','#fffefa'],mist:['霧藍','#91aeb8'],moss:['苔綠','#a6af96'],
  clay:['陶粉','#c6a09b'],lavender:['暮紫','#afa5bb']
};

export function mountInk(article, signal) {
  const endpoint = document.querySelector('meta[name="echo-endpoint"]').content;
  const url = new URL('ink/key',endpoint);
  const panel = document.createElement('details');
  panel.className = 'ink-panel';
  panel.innerHTML = `
    <summary>接續上一筆</summary>
    <p>替鑰匙上的膠帶試個顏色。留下後，下一位訪客就會看見。</p>
    <div class="ink-swatches" role="group" aria-label="試色"></div>
    <div class="ink-history" role="group" aria-label="先前的色痕"></div>
    <p role="status"></p>
    <button type="button" class="ink-save" disabled>留下這一筆</button>
    <button type="button" class="ink-reset" disabled>回到公開色</button>`;
  article.querySelector('.story-trails').before(panel);
  const model = article.querySelector('.model');
  const swatches = panel.querySelector('.ink-swatches');
  const history = panel.querySelector('.ink-history');
  const status = panel.querySelector('[role=status]');
  const save = panel.querySelector('.ink-save');
  const reset = panel.querySelector('.ink-reset');
  let state;
  let preview;
  let busy = false;

  function paint(color) {
    model.dataset.ink = palette[color][1];
    model.dispatchEvent(new Event('inkchange'));
  }
  function update() {
    for (const button of swatches.children) {
      button.setAttribute('aria-pressed',String(button.dataset.color === (preview ?? state?.color)));
      button.disabled = !state || busy;
    }
    save.disabled = !state || busy || !preview || preview === state.color;
    reset.disabled = !preview || busy;
  }
  function swatch(color, old = false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.color = color;
    button.style.setProperty('--swatch',palette[color][1]);
    button.textContent = palette[color][0];
    if (old) button.setAttribute('aria-label','試看曾留下的' + palette[color][0]);
    button.onclick = () => {
      if (!state || busy) return;
      preview = color;
      paint(color);
      status.textContent = color === state.color ? '這就是目前的公開色。' : '正在試色。';
      update();
    };
    return button;
  }
  Object.keys(palette).forEach(color => swatches.append(swatch(color)));
  function apply(next) {
    state = next;
    preview = undefined;
    paint(state.color);
    history.replaceChildren();
    if (state.history.length) {
      history.append('先前的色痕 ');
      state.history.forEach(row => history.append(swatch(row.color,true)));
    }
    update();
  }
  reset.onclick = () => {
    preview = undefined;
    paint(state.color);
    status.textContent = '已回到公開色。';
    update();
  };
  async function load() {
    if (busy || preview) return;
    try {
      const response = await fetch(url,{signal,cache:'no-store'});
      if (!response.ok) throw Error();
      const next = await response.json();
      if (!busy && !preview && next.revision >= (state?.revision ?? 0)) {
        apply(next);
        status.textContent = next.revision ? '目前公開色是' + palette[next.color][0] + '。' : '還沒有訪客留下顏色。';
      }
    } catch {
      if (!signal.aborted && !state) status.textContent = '暫時讀不到公開色，稍後再打開試試。';
    }
  }
  save.onclick = async () => {
    if (save.disabled) return;
    busy = true;
    update();
    try {
      const response = await fetch(url,{
        method:'POST',signal,headers:{'Content-Type':'application/json'},
        body:JSON.stringify({color:preview,revision:state.revision})
      });
      if (response.status === 409) {
        apply(await response.json());
        status.textContent = '有人剛留下新的一筆。你可以保留它，或重新試色。';
      } else if (response.status === 429) {
        status.textContent = '先等一會兒，再留下這一筆。';
      } else {
        if (!response.ok) throw Error();
        apply(await response.json());
        status.textContent = '這一筆已留給下一位訪客。';
      }
    } catch {
      if (!signal.aborted) status.textContent = '這一筆還沒送出，請稍後再試。';
    } finally {
      busy = false;
      update();
    }
  };
  panel.addEventListener('toggle',() => { if (panel.open) load(); },{signal});
  update();
  load();
}
