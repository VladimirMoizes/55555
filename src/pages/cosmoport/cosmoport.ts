function startCountdown() {
  const timerElement = document.getElementById('timer') as HTMLElement;
  if (!timerElement) return;

  const STORAGE_KEY = 'countdown_time';
  const START_TIME_KEY = 'countdown_start_time';

  const initialParts = timerElement.textContent?.split(' : ').map(Number);
  const totalSeconds =
    (initialParts?.[0] || 0) * 3600 +
    (initialParts?.[1] || 0) * 60 +
    (initialParts?.[2] || 0);

  const savedStart = localStorage.getItem(START_TIME_KEY);
  const now = Date.now();

  let remainingSeconds: number;

  if (savedStart) {
    const elapsedSeconds = Math.floor((now - Number(savedStart)) / 1000);
    remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);
  } else {
    localStorage.setItem(START_TIME_KEY, String(now));
    remainingSeconds = totalSeconds;
  }

  function updateDisplay(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    timerElement.textContent = `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
  }

  updateDisplay(remainingSeconds);

  if (remainingSeconds <= 0) {
    timerElement.textContent = '00 : 00 : 00';
    timerElement.style.color = 'red';
    localStorage.removeItem(START_TIME_KEY);
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  const interval = setInterval(() => {
    const currentStart = Number(
      localStorage.getItem(START_TIME_KEY) || Date.now()
    );
    const elapsed = Math.floor((Date.now() - currentStart) / 1000);
    const remaining = Math.max(0, totalSeconds - elapsed);

    updateDisplay(remaining);

    if (remaining <= 0) {
      clearInterval(interval);
      timerElement.textContent = '00 : 00 : 00';
      timerElement.style.color = 'red';
      localStorage.removeItem(START_TIME_KEY);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, 1000);

  window.addEventListener('beforeunload', () => clearInterval(interval));
  document.addEventListener('astro:before-swap', () => clearInterval(interval));
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', startCountdown);
  document.addEventListener('astro:page-load', startCountdown);
}
