function handleCarMoveAndRedirect() {
  if (typeof window === 'undefined') return;

  const car = document.querySelector('[data-car]') as HTMLElement;
  const link = document.querySelector('[data-link]') as HTMLAnchorElement;
  const pointer = document.querySelector('[data-pointer]') as HTMLElement;
  const buildingImg = link.querySelector('[data-building]') as HTMLImageElement;

  if (!car || !link) return;

  let isAnimating = false;
  const originalHref = link.getAttribute('href');

  if (!originalHref) return;

  link.removeAttribute('href');
  link.style.cursor = 'pointer';

  const pathname = window.location.pathname || '';
  const rocketImg = document.querySelector('[data-rocket') as HTMLElement;

  if (pathname.includes('cosmoport')) {
    setTimeout(() => {
      car.setAttribute('data-moving', 'true');
    }, 100);

    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAnimating) return;
      isAnimating = true;

      car.setAttribute('data-moving-second', 'true');

      setTimeout(() => {
        setTimeout(() => {
          rocketImg.setAttribute('data-rocket-launch', 'true');
          rocketImg.setAttribute(
            'src',
            '/assets/images/main/buildings/rocket_with_fire.png'
          );
        }, 100);
      }, 2500);

      setTimeout(() => {
        window.location.href = originalHref;
      }, 5600);
    });

    if (pointer) {
      pointer.addEventListener('click', (e) => {
        e.preventDefault();
        link.click();
      });
    }
  } else {
    setTimeout(() => {
      car.setAttribute('data-moving', 'true');
    }, 100);

    function startAnimationAndRedirect() {
      if (isAnimating) return;
      isAnimating = true;

      if (pathname.includes('museum')) {
        car.setAttribute('data-moving-museum', 'true');
      } else if (pathname.includes('workshop')) {
        car.setAttribute('data-moving-workshop', 'true');
      } else if (pathname.includes('exhibition')) {
        car.setAttribute('data-moving-exhibition', 'true');
      } else if (pathname.includes('museum')) {
        car.setAttribute('data-moving-museum', 'true');
      } else if (pathname.includes('tv-studio')) {
        car.setAttribute('data-moving-tv-studio', 'true');
      } else {
        car.setAttribute('data-moving-second', 'true');
      }

      setTimeout(() => {
        if (originalHref) {
          window.location.href = originalHref;
        }
      }, 3000);
    }

    link.addEventListener('click', (e) => {
      e.preventDefault();
      startAnimationAndRedirect();
    });

    if (pointer) {
      pointer.addEventListener('click', (e) => {
        e.preventDefault();
        startAnimationAndRedirect();
      });
    }
  }

  if (buildingImg && window.location.pathname.includes('workshop')) {
    buildingImg.style.width = 'clamp(320px, 16px + 29.69vw, 586px)';
  }

  if (buildingImg && window.location.pathname.includes('tv-studio')) {
    buildingImg.style.position = 'relative';
    buildingImg.style.width = 'clamp(320px, -114.29px + 42.41vw, 700px)';
    buildingImg.style.top = '-25px';
    buildingImg.style.left = 'clamp(-160px, 54.29px + -11.16vw, -60px)';
  }

  if (buildingImg && window.location.pathname.includes('exhibition')) {
    buildingImg.style.position = 'relative';
    buildingImg.style.width = 'clamp(320px, -22.86px + 33.48vw, 620px)';
    buildingImg.style.top = 'clamp(-40px, 2.86px + -2.23vw, -20px)';
    buildingImg.style.left = 'clamp(-80px, 80.71px + -8.37vw, -5px)';
  }

  if (buildingImg && window.location.pathname.includes('cosmoport')) {
    link.style.scale = 'clamp(0.5, calc(90vw / 1920px), 1)';
    link.style.transformOrigin = 'bottom center';
    link.style.left = 'clamp(0px, 372.34px + -26.60vw, 100px)';
  }

  if (buildingImg && window.location.pathname.includes('museum')) {
    buildingImg.style.position = 'relative';
    buildingImg.style.left = 'clamp(20px, 148.57px + -6.70vw, 80px)';
    buildingImg.style.width = 'clamp(250px, -122.57px + 36.38vw, 576px)';
  }
}

// function handleMobileCarMoveAndRedirect() {
//   if (typeof window === 'undefined') return;

//   const carMobile = document.querySelector('[data-car-mobile]') as HTMLElement;
//   const mobileContainer = document.querySelector(
//     '[data-mobile-buildings-container-mobile]'
//   ) as HTMLElement;

//   if (!carMobile || !mobileContainer) return;

//   carMobile.style.top = '120px';
//   setTimeout(() => {
//     carMobile.setAttribute('data-mobile-moving-start', 'true');
//   }, 100);

//   let isAnimatingMobile = false;

//   mobileContainer.addEventListener('click', (e: Event) => {
//     const target = (e.target as HTMLElement).closest(
//       '[data-mobile-building-id]'
//     ) as HTMLAnchorElement;
//     if (!target) return;

//     if (isAnimatingMobile) return;
//     isAnimatingMobile = true;

//     const originalHref = target.getAttribute('href');
//     if (!originalHref) return;

//     target.removeAttribute('href');
//     target.style.cursor = 'pointer';

//     const targetRect = target.getBoundingClientRect();
//     const containerRect = mobileContainer.getBoundingClientRect();

//     const relativeTop =
//       targetRect.top - containerRect.top + targetRect.height / 2 + 80;

//     carMobile.setAttribute('data-mobile-moving-start', 'false');
//     carMobile.style.top = `${relativeTop}px`;

//     setTimeout(() => {
//       window.location.href = originalHref;
//     }, 2500);
//   });
// }

function handleMobileCarMoveAndRedirect() {
  if (typeof window === 'undefined') return;

  const carMobile = document.querySelector('[data-car-mobile]') as HTMLElement;
  const mobileContainer = document.querySelector(
    '[data-mobile-buildings-container-mobile]'
  ) as HTMLElement;

  if (!carMobile || !mobileContainer) return;

  carMobile.style.top = '120px';
  setTimeout(() => {
    carMobile.setAttribute('data-mobile-moving-start', 'true');
  }, 100);

  let isAnimatingMobile = false;

  mobileContainer.addEventListener('click', (e: Event) => {
    const target = (e.target as HTMLElement).closest(
      '[data-mobile-building-id]'
    ) as HTMLAnchorElement;
    if (!target) return;

    if (isAnimatingMobile) return;
    isAnimatingMobile = true;

    const originalHref = target.getAttribute('href');
    if (!originalHref) return;

    target.removeAttribute('href');
    target.style.cursor = 'pointer';

    const targetRect = target.getBoundingClientRect();
    const containerRect = mobileContainer.getBoundingClientRect();

    const relativeTop =
      targetRect.top - containerRect.top + targetRect.height / 2 + 80;

    const pathname = window.location.pathname || '';

    carMobile.setAttribute('data-mobile-moving-start', 'false');
    carMobile.style.top = `${relativeTop}px`;

    if (pathname.includes('cosmoport')) {
      const rocketMobile = document.querySelector(
        '[data-rocket-mobile]'
      ) as HTMLElement;

      setTimeout(() => {
        if (rocketMobile) {
          rocketMobile.setAttribute('data-rocket-launch-mobile', 'true');
        }
      }, 2500);

      setTimeout(() => {
        window.location.href = originalHref;
      }, 4500);
    } else {
      setTimeout(() => {
        window.location.href = originalHref;
      }, 2500);
    }
  });
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    (handleCarMoveAndRedirect(), handleMobileCarMoveAndRedirect());
  });
  document.addEventListener('astro:page-load', () => {
    (handleCarMoveAndRedirect(), handleMobileCarMoveAndRedirect());
  });
}
