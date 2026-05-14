export function initAccordions() {
  const accordionItems = document.querySelectorAll('[data-accordion]');

  accordionItems.forEach((accordionItem) => {
    const button = accordionItem.querySelector('[data-accordion-btn]');
    const content = accordionItem.querySelector('[data-accordion-content]');

    if (!button || !content) return;

    button.setAttribute('data-open', 'false');

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('data-open') === 'true';

      if (isOpen) {
        (content as HTMLElement).style.maxHeight = '0';
        button.setAttribute('data-open', 'false');
      } else {
        (content as HTMLElement).style.maxHeight = content.scrollHeight + 'px';
        button.setAttribute('data-open', 'true');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initAccordions);
document.addEventListener('astro:page-load', initAccordions);
