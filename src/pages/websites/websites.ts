function initSlider() {
  const imageGirl = document.getElementById('imageGirl');
  const contentWrapper = document.getElementById(
    'contentWrapper'
  ) as HTMLElement;
  const videoContainer = document.getElementById(
    'videoContainer'
  ) as HTMLElement;
  const video = document.getElementById('introVideo') as HTMLVideoElement;

  let isVideoPlaying = false;

  imageGirl?.addEventListener('click', () => {
    if (isVideoPlaying) return;
    isVideoPlaying = true;

    videoContainer.setAttribute('data-active', 'true');
    contentWrapper.setAttribute('data-hidden', 'true');

    video.play();

    video.addEventListener('ended', () => {
      videoContainer.setAttribute('data-active', 'false');
      contentWrapper.setAttribute('data-hidden', 'false');
      isVideoPlaying = false;
    });
  });
  window.addEventListener('load', () => {
    const element = document.querySelector('#mainTitle');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });

  const buttonArrow = document.querySelector('#buttonArrow');
  const dev = document.querySelector('#dev');

  if (buttonArrow) {
    buttonArrow.addEventListener('click', () => {
      if (dev) {
        dev.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }

  const cardList = document.querySelector('[data-cardList]');
  const buttons = document.querySelectorAll('[data-button]');

  if (!cardList || buttons.length < 2) return;

  const leftBtn = buttons[0];
  const rightBtn = buttons[1];
  const scrollAmount = 600;

  leftBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cardList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cardList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

function initStages() {
  const stagesList = document.querySelector('[data-stages-list]');
  const stagesListItems = stagesList ? Array.from(stagesList.children) : [];

  stagesListItems.forEach((item, i) => {
    const htmlItem = item;
    (htmlItem as HTMLElement).style.zIndex = String(stagesListItems.length - i);
  });
}

function initCar() {
  const car = document.querySelector('[data-car]') as HTMLElement;
  const continueBtn = document.querySelector(
    '[data-button-continue]'
  ) as HTMLButtonElement;
  const receptionBtn = document.querySelector(
    '[data-button-reception]'
  ) as HTMLButtonElement;

  if (!car) return;

  let isAnimating = false;

  function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    car.setAttribute('data-moving', 'true');
  }

  car.addEventListener('click', startAnimation);
  if (continueBtn) continueBtn.addEventListener('click', startAnimation);
  if (receptionBtn) receptionBtn.addEventListener('click', startAnimation);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initStages();
    initCar();
  });
  document.addEventListener('astro:page-load', () => {
    initSlider();
    initStages();
    initCar();
  });
}
