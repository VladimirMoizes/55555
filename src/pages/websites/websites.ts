function initModalSlider(): void {
  const designSlides = document.querySelectorAll(
    '[data-slider="design"] [data-slide]'
  );
  const designOverlay = document.getElementById('sliderDesign') as HTMLElement;
  const designImage = document.getElementById(
    'sliderDesignImage'
  ) as HTMLImageElement;
  const designCounter = document.getElementById(
    'sliderDesignCounter'
  ) as HTMLElement;

  const usabilitySlides = document.querySelectorAll(
    '[data-slider="usability"] [data-slide]'
  );
  const usabilityOverlay = document.getElementById(
    'sliderUsability'
  ) as HTMLElement;
  const usabilityImage = document.getElementById(
    'sliderUsabilityImage'
  ) as HTMLImageElement;
  const usabilityCounter = document.getElementById(
    'sliderUsabilityCounter'
  ) as HTMLElement;

  function setupSlider(
    slides: NodeListOf<Element>,
    overlay: HTMLElement,
    image: HTMLImageElement,
    counter: HTMLElement,
    type: string
  ): void {
    if (!overlay || !image || slides.length === 0) {
      console.log('Слайдер ' + type + ': элементы не найдены');
      return;
    }

    let currentIndex: number = 0;

    function getImageSrc(slide: Element): string {
      const dataImage = slide.getAttribute('data-image');
      if (dataImage) return dataImage;

      const img = slide.querySelector('img') as HTMLImageElement | null;
      if (img && img.src) return img.src;

      const card = slide.querySelector('.card') as HTMLElement;
      if (card) {
        const inlineStyle = card.getAttribute('style') || '';
        const match = inlineStyle.match(
          /background-image:\s*url\(["']?([^"']*)["']?\)/i
        );
        if (match) return match[1];
      }

      return '';
    }

    function openSlider(index: number): void {
      currentIndex = index;
      const slide = slides[index];
      const imgSrc = getImageSrc(slide);

      console.log('Открыт слайдер ' + type, index, 'src:', imgSrc);

      if (imgSrc) {
        image.src = imgSrc;
        if (counter) counter.textContent = `${index + 1} / ${slides.length}`;

        overlay.style.cssText = `
          display: flex !important;
          opacity: 1 !important;
          visibility: visible !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background: rgba(0,0,0,0.9) !important;
          z-index: 999999 !important;
          align-items: center !important;
          justify-content: center !important;
          pointer-events: auto !important;
          backdrop-filter: blur(8px) !important;
        `;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        console.log('❌ Слайд ' + type + ' ' + index + ' не имеет изображения');
      }
    }

    function closeSlider(): void {
      overlay.classList.remove('active');
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }

    function goTo(index: number): void {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      openSlider(index);
    }

    slides.forEach((slide, index) => {
      slide.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Клик по слайду ' + type + ' ' + index);
        openSlider(index);
      });
    });

    const closeBtn = overlay.querySelector('[data-close="' + type + '"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeSlider);
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSlider();
    });

    const prevBtn = overlay.querySelector('[data-prev="' + type + '"]');
    const nextBtn = overlay.querySelector('[data-next="' + type + '"]');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
    }
  }

  setupSlider(
    designSlides,
    designOverlay,
    designImage,
    designCounter,
    'design'
  );
  setupSlider(
    usabilitySlides,
    usabilityOverlay,
    usabilityImage,
    usabilityCounter,
    'usability'
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sliderOverlay.active').forEach((el) => {
        (el as HTMLElement).style.display = 'none';
        el.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });
}

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
        buttonArrow.setAttribute('data-animate', 'true');
      }
      isVideoPlaying = false;
    });

    // При клике на стрелку (скролл) можно убрать анимацию
    buttonArrow?.addEventListener('click', () => {
      buttonArrow.setAttribute('data-animate', 'false');
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
    '[data-button-design]'
  ) as NodeListOf<HTMLButtonElement>;

  if (!cardList || buttons.length < 2) return;

  const leftBtn = buttons[0] as HTMLButtonElement;
  const rightBtn = buttons[1] as HTMLButtonElement;
  const scrollAmount: number = 593;

  leftBtn.addEventListener('click', (e: MouseEvent): void => {
    e.preventDefault();
    cardList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', (e: MouseEvent): void => {
    e.preventDefault();
    cardList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  const usabilityList = document.querySelector(
    '[data-usability-list]'
  ) as HTMLElement | null;
  const usabilityButtons = document.querySelectorAll(
    '[data-button-usability]'
  ) as NodeListOf<HTMLButtonElement>;

  if (usabilityList && usabilityButtons.length >= 2) {
    const leftBtn = usabilityButtons[0];
    const rightBtn = usabilityButtons[1];
    const scrollAmount: number = 610;

    leftBtn.addEventListener('click', (e: MouseEvent): void => {
      e.preventDefault();
      usabilityList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', (e: MouseEvent): void => {
      e.preventDefault();
      usabilityList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
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
    initModalSlider();
  });
  document.addEventListener('astro:page-load', (): void => {
    initSlider();
    initStages();
    initCar();
    initModalSlider();
  });
}
