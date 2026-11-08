const endpoint = document.querySelector('meta[name="echo-endpoint"]')?.content;
let active;

export function openEcho(item) {
  active?.abort();
  active = new AbortController();
  const controller = active;
  const {signal} = controller;
  const dialog = document.querySelector('#echo');
  const form = dialog.querySelector('.echo-form');
  const input = form.querySelector('textarea');
  const status = dialog.querySelector('[role="status"]');
  const list = dialog.querySelector('ul');
  const submit = form.querySelector('button');
  const url = endpoint ? new URL('echoes/' + item.id, endpoint) : null;
  dialog.querySelector('h2').textContent = item.title + '｜失物留言';
  list.replaceChildren();
  form.reset();
  submit.disabled = false;
  form.hidden = !url;
  status.textContent = url ? '正在讀取留言。' : '失物留言尚未開放。';
  dialog.showModal();
  dialog.addEventListener('close', () => controller.abort(), {once:true});
  function append(row) {
    const entry = document.createElement('li');
    entry.textContent = row.body;
    list.append(entry);
  }
  if (!url) return;
  async function load() {
    try {
      const response = await fetch(url,{signal});
      if (!response.ok) throw Error();
      const rows = await response.json();
      list.replaceChildren();
      rows.forEach(append);
      status.textContent = rows.length ? '' : '這裡還很安靜。';
    } catch {
      if (!signal.aborted) status.textContent = '暫時讀不到留言，請稍後再試。';
    }
  }
  form.onsubmit = async event => {
    event.preventDefault();
    const body = input.value.trim();
    if (!body || submit.disabled) return;
    submit.disabled = true;
    try {
      const response = await fetch(url,{
        method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({body}),signal
      });
      if (!response.ok) throw Error(String(response.status));
      input.value = '';
      list.prepend(Object.assign(document.createElement('li'),{textContent:body}));
      if (!signal.aborted) status.textContent = '你的留言已留下。';
    } catch (error) {
      if (!signal.aborted) status.textContent = error.message === '429' ? '先等一會兒，再留下一行。' : '這行還沒送出，請稍後再試。';
    } finally {
      if (!signal.aborted) submit.disabled = false;
    }
  };
  load();
}

