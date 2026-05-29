const modal = document.getElementById('myModal');
const closeBtn = document.getElementById('closeModalBtn');

if (modal) {
  (window as any).openModal = () => {
    modal.style.display = 'flex';
  };
  (window as any).closeModal = () => {
    modal.style.display = 'none';
  };
  if (closeBtn)
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
}
