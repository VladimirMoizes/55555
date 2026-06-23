function initSlider(): void {
  const mainBlock = document.getElementById('mainBlock') as HTMLElement | null;
  const imageGirl = document.getElementById(
    'imageGirl'
  ) as HTMLImageElement | null;
  const videoContainer = document.getElementById(
    'videoContainer'
  ) as HTMLElement | null;
  const video = document.getElementById(
    'introVideo'
  ) as HTMLVideoElement | null;
  const buttonArrow = document.getElementById(
    'buttonArrow'
  ) as HTMLButtonElement | null;

  let isVideoPlaying: boolean = false;

  mainBlock?.addEventListener('click', (): void => {
    if (isVideoPlaying) return;
    if (!video) return;

    isVideoPlaying = true;

    if (videoContainer) {
      videoContainer.setAttribute('data-active', 'true');
    }
    if (imageGirl) {
      imageGirl.setAttribute('data-hidden', 'true');
    }
    if (buttonArrow) {
      buttonArrow.setAttribute('data-hidden', 'true');
    }

    video.play().catch((err: Error) => {
      console.error('Ошибка воспроизведения видео:', err);
    });

    video.addEventListener('ended', (): void => {
      if (videoContainer) {
        videoContainer.setAttribute('data-active', 'false');
      }
      if (imageGirl) {
        imageGirl.style.transition = 'none';
        imageGirl.setAttribute('data-moved', 'true');
        requestAnimationFrame(() => {
          imageGirl.style.transition = 'opacity 0.5s ease';
          imageGirl.removeAttribute('data-hidden');
        });
      }
      if (buttonArrow) {
        buttonArrow.removeAttribute('data-hidden');
      }
      isVideoPlaying = false;
    });
  });

  window.addEventListener('load', (): void => {
    const element = document.querySelector('#mainTitle') as HTMLElement | null;
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });

  const buttonArrowScroll = document.querySelector(
    '#buttonArrow'
  ) as HTMLButtonElement | null;
  const dev = document.querySelector('#dev') as HTMLElement | null;

  if (buttonArrowScroll) {
    buttonArrowScroll.addEventListener('click', (e): void => {
      e.stopPropagation();
      if (dev) {
        dev.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }

  const cardList = document.querySelector(
    '[data-cardList]'
  ) as HTMLElement | null;
  const buttons = document.querySelectorAll(
    '[data-button]'
  ) as NodeListOf<HTMLButtonElement>;

  if (!cardList || buttons.length < 2) return;

  const leftBtn = buttons[0] as HTMLButtonElement;
  const rightBtn = buttons[1] as HTMLButtonElement;
  const scrollAmount: number = 600;

  leftBtn.addEventListener('click', (e: MouseEvent): void => {
    e.preventDefault();
    cardList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', (e: MouseEvent): void => {
    e.preventDefault();
    cardList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

function initStages(): void {
  const stagesList = document.querySelector(
    '[data-stages-list]'
  ) as HTMLElement | null;
  const stagesListItems = stagesList ? Array.from(stagesList.children) : [];

  stagesListItems.forEach((item: Element, i: number): void => {
    (item as HTMLElement).style.zIndex = String(stagesListItems.length - i);
  });
}

function initCar(): void {
  const car = document.querySelector('[data-car]') as HTMLElement | null;
  const continueBtn = document.querySelector(
    '[data-button-continue]'
  ) as HTMLButtonElement | null;
  const receptionBtn = document.querySelector(
    '[data-button-reception]'
  ) as HTMLButtonElement | null;

  if (!car) return;

  let isAnimating: boolean = false;

  function startAnimation(): void {
    if (isAnimating) return;
    isAnimating = true;
    car?.setAttribute('data-moving', 'true');
  }

  car.addEventListener('click', startAnimation);
  if (continueBtn) continueBtn.addEventListener('click', startAnimation);
  if (receptionBtn) receptionBtn.addEventListener('click', startAnimation);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', (): void => {
    initSlider();
    initStages();
    initCar();
  });
  document.addEventListener('astro:page-load', (): void => {
    initSlider();
    initStages();
    initCar();
  });
}
