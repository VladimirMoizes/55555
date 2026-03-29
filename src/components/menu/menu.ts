function initCloseButton() {
  const closeBtn = document.querySelector('[data-close]');
  const menu = document.querySelector('#menu') as HTMLElement;

  if (closeBtn && menu) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      menu.style.transform = 'translateX(100%)';
      console.log('Меню закрыто через отдельный обработчик');
    });
  }
}

function handleArrowClick(e: Event) {
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
  initCloseButton();
  document.body.removeEventListener('click', handleArrowClick);
  document.body.addEventListener('click', handleArrowClick);
  console.log('Крестик:', document.querySelector('[data-close]'));
  console.log('Меню:', document.querySelector('#menu'));
}

initMenu();
document.addEventListener('astro:page-load', initMenu);
