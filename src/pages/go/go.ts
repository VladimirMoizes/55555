import { navigate } from 'astro:transitions/client';

function setupGoAnimation() {
  const car = document.querySelector('[data-car]') as HTMLElement;
  const pointer = document.querySelector('[data-pointer]');

  if (!car) return;

  let isAnimating = false;
  let autoTimer: number;

  function redirectToMain() {
    navigate('/main');
  }

  function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;

    car.setAttribute('data-moving', 'true');

    car.addEventListener('transitionend', () => redirectToMain(), {
      once: true,
    });
  }

  car.addEventListener('click', startAnimation);
  if (pointer) pointer.addEventListener('click', startAnimation);

  autoTimer = window.setTimeout(startAnimation, 10000);

  window.addEventListener('beforeunload', () => {
    if (autoTimer) clearTimeout(autoTimer);
  });
}

// Обёртка для серверного рендеринга
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', setupGoAnimation);
  document.addEventListener('astro:page-load', setupGoAnimation);
}
