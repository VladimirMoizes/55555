// const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwoQZHc8aiCDBzAWxo3Cbnx3BN9ZbeAVKLNNrhmqXC-txm4w6L0ecnxGj-Jt1c6aA8i/exec';

function initBriefToggle(): void {
  const briefContent = document.getElementById('briefContent');
  const openBriefBtn = document.getElementById('openBriefBtn');
  const toggleBtn = document.getElementById('toggleBriefBtn');
  const formFirst = document.getElementById(
    'formFirst'
  ) as HTMLFormElement | null;
  const formSecond = document.getElementById(
    'formSecond'
  ) as HTMLFormElement | null;
  const documents = document.querySelectorAll('[data-type]');

  const lastSubmitTime = {
    formFirst: 0,
    formSecond: 0,
  };

  function sendFormData(data: any): Promise<void> {
    const SCRIPT_URL =
      'https://script.google.com/macros/s/AKfycbxtwLq6AUb0csAC9wyltw8XFKWOSFVVWpRmAQ4Ex1P2DTsRQUbOaMThf8eIVtgOoc1G/exec';

    return fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {})
      .catch((error) => {
        console.error('Ошибка отправки:', error);
      });
  }

  function canSubmit(formId: 'formFirst' | 'formSecond'): boolean {
    const now = Date.now();
    const lastSubmit = lastSubmitTime[formId];
    const fiveMinutes = 5 * 60 * 1000; // 5 минут в миллисекундах

    if (now - lastSubmit < fiveMinutes) {
      const remaining = Math.ceil((fiveMinutes - (now - lastSubmit)) / 1000);
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      alert(
        `Пожалуйста, подождите ${minutes} мин ${seconds} сек перед повторной отправкой.`
      );
      return false;
    }

    lastSubmitTime[formId] = now;
    return true;
  }

  function setupFormHandler(
    form: HTMLFormElement,
    formId: 'formFirst' | 'formSecond'
  ) {
    let isSubmitting = false;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Проверяем время (по первой форме)
      if (!canSubmit('formFirst')) return;

      if (isSubmitting) return;
      isSubmitting = true;

      const submitBtn = form.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement | null;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
      }

      // Собираем данные из ОБЕИХ форм
      const formFirstEl = document.getElementById(
        'formFirst'
      ) as HTMLFormElement;
      const formSecondEl = document.getElementById(
        'formSecond'
      ) as HTMLFormElement;

      const formData = new FormData();

      // Добавляем данные из первой формы
      if (formFirstEl) {
        const firstData = new FormData(formFirstEl);
        for (const [key, value] of firstData.entries()) {
          formData.append(key, value);
        }
      }

      // Добавляем данные из второй формы
      if (formSecondEl) {
        const secondData = new FormData(formSecondEl);
        for (const [key, value] of secondData.entries()) {
          formData.append(key, value);
        }
      }

      const data = Object.fromEntries(formData.entries());

      sendFormData(data).finally(() => {
        isSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Отправить нам';
        }
      });

      const modalContent = document.querySelector('#modalContent');
      if (modalContent) {
        modalContent.innerHTML =
          '<h2>Спасибо за обращение!</h2><p>Мы скоро с Вами свяжемся.</p>';
      }
      if ((window as any).openModal) (window as any).openModal();
    });
  }

  // function setupFormHandler(
  //   form: HTMLFormElement,
  //   formId: 'formFirst' | 'formSecond'
  // ) {
  //   let isSubmitting = false;

  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();

  //     // Проверяем время
  //     if (!canSubmit(formId)) return;

  //     if (isSubmitting) return;
  //     isSubmitting = true;

  //     const submitBtn = form.querySelector(
  //       'button[type="submit"]'
  //     ) as HTMLButtonElement | null;
  //     if (submitBtn) {
  //       submitBtn.disabled = true;
  //       submitBtn.textContent = 'Отправка...';
  //     }

  //     const formData = new FormData(form);
  //     const data = Object.fromEntries(formData.entries());

  //     sendFormData(data).finally(() => {
  //       isSubmitting = false;
  //       if (submitBtn) {
  //         submitBtn.disabled = false;
  //         submitBtn.textContent = 'Отправить нам';
  //       }
  //     });

  //     const modalContent = document.querySelector('#modalContent');
  //     if (modalContent) {
  //       modalContent.innerHTML =
  //         '<h2>Спасибо за обращение!</h2><p>Мы скоро с Вами свяжемся.</p>';
  //     }
  //     if ((window as any).openModal) (window as any).openModal();
  //   });
  // }

  if (formFirst) setupFormHandler(formFirst, 'formFirst');
  if (formSecond) setupFormHandler(formSecond, 'formSecond');

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

  // Вторая форма
  if (!formSecond || !toggleBtn || !openBriefBtn) return;

  formSecond.setAttribute('data-hidden', 'true');
  openBriefBtn.textContent = 'Заполнить бриф онлайн';

  openBriefBtn.addEventListener('click', () => {
    const isHidden = formSecond.getAttribute('data-hidden') === 'true';
    if (isHidden) {
      formSecond.setAttribute('data-hidden', 'false');
      openBriefBtn.textContent = 'Скрыть бриф';
    } else {
      formSecond.setAttribute('data-hidden', 'true');
      openBriefBtn.textContent = 'Заполнить бриф онлайн';
    }
  });

  toggleBtn.addEventListener('click', () => {
    formSecond.setAttribute('data-hidden', 'true');
    openBriefBtn.textContent = 'Заполнить бриф онлайн';
  });

  // // Бриф
  // if (!briefContent || !toggleBtn) return;

  // if (openBriefBtn) {
  //   openBriefBtn.addEventListener('click', () => {
  //     briefContent.setAttribute('data-hidden', 'false');
  //     toggleBtn.textContent = 'Скрыть бриф';
  //   });
  // }

  // toggleBtn.addEventListener('click', () => {
  //   const isHidden = briefContent.getAttribute('data-hidden') === 'true';
  //   if (isHidden) {
  //     briefContent.setAttribute('data-hidden', 'false');
  //     toggleBtn.textContent = 'Скрыть бриф';
  //   } else {
  //     briefContent.setAttribute('data-hidden', 'true');
  //   }
  // });

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
