const overlay = document.querySelector('.opening');
const title = overlay.querySelector('.opening-title');
const brand = document.querySelector('.brand');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

if (!location.hash) {
  const content = document.querySelectorAll('header, main, nav, footer');
  const note = overlay.querySelector('.opening-note');
  const skip = overlay.querySelector('.skip');
  let timer;
  function finish() {
    clearTimeout(timer);
    overlay.hidden = true;
    document.body.classList.remove('opening-active');
    content.forEach(section => { section.inert = false; });
    brand.focus({preventScroll:true});
  }
  content.forEach(section => { section.inert = true; });
  document.body.classList.add('opening-active');
  overlay.hidden = false;
  skip.onclick = finish;
  overlay.classList.add('reading');
  note.hidden = false;
  note.querySelector('h2').focus({preventScroll:true});
  note.querySelector('.opening-enter').onclick = () => {
    if (reduced.matches) { finish(); return; }
    note.hidden = true;
    overlay.classList.remove('reading');
    skip.focus({preventScroll:true});
    reduced.addEventListener('change', finish, {once:true});
    requestAnimationFrame(() => {
      if (overlay.hidden) return;
      const target = brand.getBoundingClientRect();
      const source = title.getBoundingClientRect();
      title.style.setProperty('--fly-x', target.left + target.width/2 - (source.left + source.width/2) + 'px');
      title.style.setProperty('--fly-y', target.top + target.height/2 - (source.top + source.height/2) + 'px');
      title.style.setProperty('--fly-scale', target.width/source.width);
      overlay.classList.add('play');
      timer = setTimeout(finish, 5150);
    });
  };
}
