function carAnimation() {
  const car = document.querySelector('[data-car]') as HTMLElement;

  if (car) {
    setTimeout(() => {
      car.setAttribute('data-moving', 'true');
      console.log('добавлен атрибут');
    }, 100);
  }
}

document.addEventListener('DOMContentLoaded', carAnimation);
document.addEventListener('astro:page-load', carAnimation);
