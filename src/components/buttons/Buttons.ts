const path = window.location.pathname;
const redirectPages = [
  '/websites/development',
  '/websites/modernization',
  '/websites/redesign',
];

if (redirectPages.some((p) => path.includes(p))) {
  const buttonList = document.querySelector('[data-button-list]');
  const links = buttonList?.querySelectorAll('a') || [];

  links.forEach((link) => {
    const href = link.getAttribute('href');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (href) {
        setTimeout(() => {
          window.location.href = href;
        }, 2000);
      }
    });
  });
}
