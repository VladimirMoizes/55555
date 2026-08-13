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
    console.warn('Мобильная анимация: не найден контейнер или машинка');
    return;
  }

  carMobile.style.top = '0px';

  let redirectTimer: ReturnType<typeof setTimeout> | null = null;

  container.addEventListener('click', (e: Event) => {
    const target = (e.target as HTMLElement).closest(
      '[data-mobile-building-id]'
    );
    if (!target) return;

    const buildingId = target.getAttribute('data-mobile-building-id');
    if (!buildingId) return;

    const buildingData = buildings.find((b) => b.id === buildingId);
    if (!buildingData) return;

    if (redirectTimer) {
      clearTimeout(redirectTimer);
      redirectTimer = null;
    }

    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const relativeTop = targetRect.top - containerRect.top;
    const finalTop = Math.max(0, relativeTop);

    carMobile.style.top = `${finalTop}px`;

    let redirectUrl = '';
    const link = buildingData.link;

    if (link && (link.startsWith('http://') || link.startsWith('https://'))) {
      window.open(link, '_blank');
      return;
    }

    if (buildingData.id === 'board') {
      redirectUrl = '/board';
    } else {
      redirectUrl = `/video/${buildingData.id}`;
    }

    redirectTimer = setTimeout(() => {
      window.location.href = redirectUrl;
      redirectTimer = null;
    }, 2200);
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
