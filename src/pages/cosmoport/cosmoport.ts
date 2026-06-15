function startCountdown() {
  const timerElement = document.getElementById('timer') as HTMLElement;
  if (!timerElement) return;

  const timeParts = timerElement.textContent?.split(' : ').map(Number);
  if (!timeParts || timeParts.length !== 3) return;

  let hours = timeParts[0];
  let minutes = timeParts[1];
  let seconds = timeParts[2];

  function updateTimer() {
    timerElement.textContent = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;

    if (hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(interval);
      timerElement.textContent = '00 : 00 : 00';
      timerElement.style.color = 'red';
      return;
    }

    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else if (hours > 0) {
      hours--;
      minutes = 59;
      seconds = 59;
    }
  }

  const interval = setInterval(updateTimer, 1000);

  window.addEventListener('beforeunload', () => clearInterval(interval));
  document.addEventListener('astro:before-swap', () => clearInterval(interval));
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', startCountdown);
  document.addEventListener('astro:page-load', startCountdown);
}
