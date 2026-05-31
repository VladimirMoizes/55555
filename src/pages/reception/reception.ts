function initBriefToggle(): void {
  const briefContent = document.getElementById('briefContent');
  const toggleBtn = document.getElementById('toggleBriefBtn');
  const forms = document.querySelectorAll('#form');
  const documents = document.querySelectorAll('[data-type]');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const modalContent = document.querySelector('#modalContent');
      if (modalContent) {
        modalContent.innerHTML =
          '<h2>Спасибо за обращение!</h2><p>Мы скоро с Вами свяжемся.</p>';
      }

      if ((window as any).openModal) (window as any).openModal();
    });
  });

  documents.forEach((doc) => {
    doc.addEventListener('click', () => {
      const type = doc.getAttribute('data-type');
      const fileUrl = doc.getAttribute('data-file-url');
      const imageUrl = doc.getAttribute('data-image-url');

      if (type === 'image') {
        const modalContent = document.querySelector('#modalContent');
        if (modalContent) {
          modalContent.innerHTML = `<img src="${imageUrl}" style="max-width: 100%; max-height: 80vh; display: block; margin: 10px auto 0;" />`;
        }
        if ((window as any).openModal) (window as any).openModal();
      } else if (type === 'file') {
        if (fileUrl) {
          window.open(fileUrl, '_blank');
        }
      } else if (type === 'download') {
        if (fileUrl) {
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = fileUrl.split('/').pop() || 'download';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
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
