function setupMenu() {
  const button = document.querySelector('#button-menu');
  const menu = document.querySelector('#menu') as HTMLDivElement;

  if (!button || !menu) return;

  const newButton = button.cloneNode(true);
  button.parentNode?.replaceChild(newButton, button);

  newButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.style.transform === 'translateX(0px)';
    menu.style.transform = isOpen ? 'translateX(100%)' : 'translateX(0px)';
  });

  document.addEventListener('click', function onClick(e) {
    if (
      menu.style.transform === 'translateX(0px)' &&
      e.target instanceof Node &&
      !menu.contains(e.target) &&
      e.target !== newButton
    ) {
      menu.style.transform = 'translateX(100%)';
    }
  });
}

document.addEventListener('DOMContentLoaded', setupMenu);
document.addEventListener('astro:page-load', setupMenu);
