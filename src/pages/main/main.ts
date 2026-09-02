import { buildings } from '../../data/mainData';

let redirectTimeout = null;
let isAnimating = false;

function isCarVisible() {
  const car = document.querySelector('[data-car]') as HTMLElement;
  if (typeof window === 'undefined') return false;
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
  if (!car) return;

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
  if (!car) return;

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
  if (buildings.length === 0) return;

  buildings.forEach((building) => {
    building.addEventListener('click', (e) => {
      e.preventDefault();

      const buildingId = building.getAttribute('data-building-id');
      let redirectUrl = '';

      if (buildingId === 'board') {
        redirectUrl = buildingId;
      } else {
        redirectUrl = `/video/${buildingId}`;
      }

      startCarAndRedirect(redirectUrl);
    });
  });
}

function initMobileCarAnimation() {
  const container = document.querySelector('[data-mobile-buildings-container]');
  const carMobile = document.querySelector('[data-car-mobile]') as HTMLElement;

  if (!container || !carMobile) {
    return;
  }

  if (carMobile) {
    setTimeout(() => {
      carMobile.setAttribute('data-mobile-moving', 'true');
    }, 50);
  }

  container.addEventListener('click', (e: Event) => {
    const target = (e.target as HTMLElement).closest(
      '[data-mobile-building-id]'
    );
    if (!target) return;

    const buildingId = target.getAttribute('data-mobile-building-id');
    if (!buildingId) return;

    const buildingData = buildings.find((b) => b.id === buildingId);
    if (!buildingData) return;

    let redirectUrl = '';

    if (buildingData.id === 'board') {
      redirectUrl = '/board';
    } else {
      redirectUrl = `/video/${buildingData.id}`;
    }

    window.location.href = redirectUrl;
  });
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    carAnimation();
    initBuildingHandlers();
    initMobileCarAnimation();
  });

  document.addEventListener('astro:page-load', () => {
    carAnimation();
    initBuildingHandlers();
    initMobileCarAnimation();
  });
}
