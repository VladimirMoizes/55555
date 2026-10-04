function initButtons(): void {
  const buttons = document.querySelectorAll('[data-button-id]');
  const inscriptions = document.querySelectorAll('[class*="inscription"]');
  const floor = document.querySelector('[data-floor]') as HTMLElement | null;
  let currentTimeout: number | null = null;
  let isAnimating: boolean = false;
  let redirectScheduled: boolean = false;

  if (floor) {
    floor.textContent = '1';
  }

  function getRedirectUrl(floorNumber: string): string | null {
    if (floorNumber === '50') return '/websites/development';
    if (floorNumber === '49') return '/websites/modernization';
    if (floorNumber === '48') return '/websites/redesign';
    return null;
  }

  function animateToTarget(targetFloor: number, callback?: () => void): void {
    const currentFloor = Number(floor?.textContent) || 1;

    if (currentFloor === targetFloor) {
      if (callback) callback();
      return;
    }

    const totalSteps = Math.abs(targetFloor - currentFloor);
    let step = 0;
    let current = currentFloor;
    const direction = targetFloor > currentFloor ? 1 : -1;

    function nextStep(): void {
      if (step < totalSteps) {
        const progress = step / totalSteps;
        let delay: number;

        if (progress < 0.2) delay = 300;
        else if (progress < 0.35) delay = 120;
        else if (progress < 0.5) delay = 60;
        else if (progress < 0.65) delay = 80;
        else if (progress < 0.8) delay = 150;
        else delay = 250;

        current += direction;
        if (floor) floor.textContent = current.toString();
        step++;

        setTimeout(nextStep, delay);
      } else {
        if (callback) callback();
      }
    }

    nextStep();
  }

  function handleButtonClick(btn: Element): void {
    if (isAnimating) return;
    if (redirectScheduled) return;

    if (currentTimeout) {
      clearTimeout(currentTimeout);
      currentTimeout = null;
    }

    const floorNumber = btn.getAttribute('data-floor-number');
    if (!floorNumber) return;

    const targetFloor = Number(floorNumber);

    buttons.forEach((b) => {
      b.setAttribute('data-active', 'false');
    });

    btn.setAttribute('data-active', 'true');

    isAnimating = true;

    animateToTarget(targetFloor, () => {
      const redirectUrl = getRedirectUrl(floorNumber);
      if (redirectUrl) {
        redirectScheduled = true;
        currentTimeout = setTimeout(() => {
          window.location.href = redirectUrl;
        }, 300);
      } else {
        isAnimating = false;
      }
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => handleButtonClick(btn));
  });

  inscriptions.forEach((inscription) => {
    inscription.addEventListener('click', () => {
      const parentLi = inscription.closest('[class*="listItem"]');
      const btn = parentLi?.querySelector('[data-button-id]');
      if (btn) {
        handleButtonClick(btn);
      }
    });
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initButtons);
  document.addEventListener('astro:page-load', initButtons);
}
