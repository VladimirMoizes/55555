function initBriefToggle(): void {
  const briefContent = document.getElementById('briefContent');
  const toggleBtn = document.getElementById('toggleBriefBtn');
  const form = document.querySelectorAll('#form');
  const modal = document.querySelector('[data-modal]');

  form.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();
      if ((window as any).openModal) (window as any).openModal();
    });
  });

  if (!briefContent || !toggleBtn) return;

  briefContent.setAttribute('data-hidden', 'true');
  toggleBtn.textContent = 'Показать бриф';

  toggleBtn.addEventListener('click', () => {
    const isHidden = briefContent.getAttribute('data-hidden') === 'true';

    if (isHidden) {
      briefContent.setAttribute('data-hidden', 'false');
      toggleBtn.textContent = 'Скрыть бриф';
    } else {
      briefContent.setAttribute('data-hidden', 'true');
      toggleBtn.textContent = 'Показать бриф';
    }
  });

  const fileInput = document.getElementById(
    'briefFile'
  ) as HTMLInputElement | null;
  const fileNameSpan = document.getElementById(
    'fileName'
  ) as HTMLElement | null;
  const removeBtn = document.getElementById(
    'removeFileBtn'
  ) as HTMLButtonElement | null;

  fileInput?.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0 && fileNameSpan) {
      fileNameSpan.textContent = files[0].name;
      if (removeBtn) removeBtn.style.display = 'inline-block';
      fileInput.disabled = true;
    } else if (fileNameSpan) {
      fileNameSpan.textContent = '';
      if (removeBtn) removeBtn.style.display = 'none';
      fileInput.disabled = false;
    }
  });

  removeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (fileInput) {
      fileInput.value = '';
      fileInput.disabled = false;
      if (fileNameSpan) fileNameSpan.textContent = '';
      if (removeBtn) removeBtn.style.display = 'none';
    }
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initBriefToggle);
  document.addEventListener('astro:page-load', initBriefToggle);
}
