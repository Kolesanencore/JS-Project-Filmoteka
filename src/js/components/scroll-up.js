import refs from '../servises/refs';

let t = null;

function up() {
  const top = Math.max(
    document.body.scrollTop,
    document.documentElement.scrollTop
  );
  if (top > 0) {
    window.scrollBy(0, (top + 100) / -10);
    t = setTimeout(up, 30);
  } else clearTimeout(t);
  return false;
}

refs.scrolUp.addEventListener('click', e => {
  e.preventDefault();
  up();
});
