// function movingCar() {
//   const car = document.querySelector('[data-car]') as HTMLElement;

//   if (car) {
//     setTimeout(() => {
//       car.setAttribute('data-moving', 'true');
//     }, 100);
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   movingCar();
// });

// document.addEventListener('astro:page-load', () => {
//   movingCar();
// });

function movingCar() {
  if (typeof window === 'undefined') return;

  const car = document.querySelector('[data-car]') as HTMLElement;

  if (car) {
    setTimeout(() => {
      car.setAttribute('data-moving', 'true');
    }, 100);
  }
}

// Запускаем только в браузере
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    movingCar();
  });

  document.addEventListener('astro:page-load', () => {
    movingCar();
  });
}
