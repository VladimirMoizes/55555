function movingCar() {
  const car = document.querySelector('[data-car]') as HTMLElement;

  if (car) {
    setTimeout(() => {
      car.setAttribute('data-moving', 'true');
    }, 100);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  movingCar();
});

document.addEventListener('astro:page-load', () => {
  movingCar();
});
