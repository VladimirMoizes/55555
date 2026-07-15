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

  if (pathname.includes('cosmoport')) {
    setTimeout(() => {
      car.setAttribute('data-moving-second', 'true');
    }, 100);

    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAnimating) return;
      isAnimating = true;

      if (buildingImg) {
        buildingImg.src = '/assets/images/main/buildings/космопорт_здание.png';
        buildingImg.style.position = 'relative';
        buildingImg.style.width = '630px';
        buildingImg.style.height = '375px';
        buildingImg.style.top = '630px';
        buildingImg.style.left = '-25px';

        const rocketImg = document.createElement('img');
        rocketImg.src = '/assets/images/main/buildings/космопорт_ракета.png';
        rocketImg.style.position = 'relative';
        rocketImg.style.width = '310px';
        rocketImg.style.height = '610px';
        rocketImg.style.top = '-55px';
        rocketImg.style.left = '225px';
        rocketImg.setAttribute('data-rocket', 'true');
        link.appendChild(rocketImg);

        requestAnimationFrame(() => {
          rocketImg.setAttribute('data-rocket-launch', 'true');
        });
      }

      setTimeout(() => {
        window.location.href = originalHref;
      }, 3000);
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
      } else {
        car.setAttribute('data-moving-second', 'true');
      }

      setTimeout(() => {
        if (originalHref) {
          window.location.href = originalHref;
        }
      }, 2000);
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

  if (buildingImg && window.location.pathname.includes('exhibition')) {
    buildingImg.style.position = 'relative';
    buildingImg.style.top = '-30px';
    buildingImg.style.left = '30px';
  }

  if (buildingImg && window.location.pathname.includes('tv-studio')) {
    buildingImg.style.position = 'relative';
    buildingImg.style.width = '700px';
    buildingImg.style.top = '-25px';
    buildingImg.style.left = '-30px';
  }
  if (buildingImg && window.location.pathname.includes('exhibition')) {
    buildingImg.style.position = 'relative';
    buildingImg.style.width = '620px';
    buildingImg.style.top = '-35px';
    buildingImg.style.left = '30px';
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', handleCarMoveAndRedirect);
  document.addEventListener('astro:page-load', handleCarMoveAndRedirect);
}
