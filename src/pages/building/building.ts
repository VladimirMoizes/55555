function handleCarMoveAndRedirect() {
  if (typeof window === 'undefined') return;

  const car = document.querySelector('[data-car]') as HTMLElement;
  const link = document.querySelector('[data-link]') as HTMLAnchorElement;

  if (!car || !link) return;

  let isAnimating = false;
  const originalHref = link.getAttribute('href');

  if (!originalHref) return;

  link.removeAttribute('href');
  link.style.cursor = 'pointer';

  if (window.location.pathname.includes('cosmoport')) {
    setTimeout(() => {
      car.setAttribute('data-moving-second', 'true');
    }, 100);

    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAnimating) return;
      isAnimating = true;

      const buildingImg = link.querySelector(
        '[data-building]'
      ) as HTMLImageElement;
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
  } else {
    setTimeout(() => {
      car.setAttribute('data-moving', 'true');
    }, 100);

    link.addEventListener('click', (e) => {
      e.preventDefault();

      if (isAnimating) return;
      isAnimating = true;

      car.setAttribute('data-moving-second', 'true');

      setTimeout(() => {
        window.location.href = originalHref;
      }, 2000);
    });
  }
  //   if (building && window.location.pathname.includes('exhibition')) {
  //     building.style.position = 'relative';
  //     building.style.top = '-30px';
  //     building.style.left = '30px';
  //     link?.setAttribute('href', '/portfolio');
  //   }

  //   if (building && window.location.pathname.includes('cosmoport')) {
  //     building.style.position = 'relative';
  //     building.style.top = '-10px';
  //     building.style.left = '20px';
  //     link?.setAttribute('href', '/cosmoport');
  //   }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', handleCarMoveAndRedirect);
  document.addEventListener('astro:page-load', handleCarMoveAndRedirect);
}
