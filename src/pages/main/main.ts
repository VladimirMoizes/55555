let redirectTimeout = null;
let isAnimating = false;

function isCarVisible() {
  const car = document.querySelector('[data-car]') as HTMLElement;
  if (!car) return false;

  const rect = car.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.bottom > 0 &&
    rect.top < windowHeight &&
    rect.right > 0 &&
    rect.left < windowWidth
  );
}

function carAnimation() {
  const car = document.querySelector('[data-car]') as HTMLElement;

  if (car) {
    setTimeout(() => {
      car.setAttribute('data-moving', 'true');
    }, 100);
  }
}

function startCarAndRedirect(redirectUrl: string) {
  if (isAnimating) return;

  if (!isCarVisible()) {
    window.location.href = redirectUrl;
    return;
  }

  isAnimating = true;
  const car = document.querySelector('[data-car]') as HTMLElement;

  if (car) {
    car.setAttribute('data-moving-second', 'true');
    redirectTimeout = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2500);
  } else {
    window.location.href = redirectUrl;
  }
}

function initBuildingHandlers() {
  const buildings = document.querySelectorAll('[data-building-id]');

  buildings.forEach((building) => {
    building.addEventListener('click', (e) => {
      e.preventDefault();

      const buildingId = building.getAttribute('data-building-id');
      const redirectUrl = `/video/${buildingId}`;

      startCarAndRedirect(redirectUrl);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  carAnimation();
  initBuildingHandlers();
});

document.addEventListener('astro:page-load', () => {
  carAnimation();
  initBuildingHandlers();
});
