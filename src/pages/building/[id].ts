function movingCar() {
  if (typeof window === 'undefined') return;

  const car = document.querySelector('[data-car]') as HTMLElement;
  const building = document.querySelector(
    '[class*="mainBuilding"]'
  ) as HTMLElement;

  if (car) {
    setTimeout(() => {
      car.setAttribute('data-moving', 'true');
    }, 100);
  }

  if (building && window.location.pathname.includes('workshop')) {
    const link = document.querySelector('[data-link]');
    link?.setAttribute('href', '/lift');
  }

  if (building && window.location.pathname.includes('exhibition')) {
    building.style.position = 'relative';
    building.style.top = '-30px';
    building.style.left = '30px';
  }

  if (building && window.location.pathname.includes('cosmoport')) {
    building.style.position = 'relative';
    building.style.top = '-10px';
    building.style.left = '20px';
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    movingCar();
  });

  document.addEventListener('astro:page-load', () => {
    movingCar();
  });
}
