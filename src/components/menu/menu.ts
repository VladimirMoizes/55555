function handleClick(e: Event) {
  const target = e.target as HTMLElement;
  const arrow = target.closest('[data-arrow]');

  if (!arrow) return;

  e.preventDefault();
  e.stopPropagation();

  const parent = arrow.closest('li');
  if (!parent) return;

  const isOpen = parent.getAttribute('data-open') === 'true';
  parent.setAttribute('data-open', isOpen ? 'false' : 'true');
}

function initMenu() {
  document.body.removeEventListener('click', handleClick);
  document.body.addEventListener('click', handleClick);
}

initMenu();

document.addEventListener('astro:page-load', initMenu);
