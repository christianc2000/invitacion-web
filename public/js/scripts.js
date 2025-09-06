const modal = document.getElementById('modal-img');
const img = document.getElementById('img-invitacion');
const modalImg = document.getElementById('img-modal-content');
const closeBtn = document.getElementById('close-modal');
let zoomed = false;

img.onclick = function() {
  modal.style.display = "flex";
  modalImg.src = this.src;
  document.body.style.overflow = "hidden"; // Oculta scroll
  modalImg.style.transform = "scale(1)";
  modalImg.style.cursor = "zoom-in";
  zoomed = false;
}
closeBtn.onclick = function() {
  modal.style.display = "none";
  document.body.style.overflow = ""; // Restaura scroll
}
modal.onclick = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}
// Zoom al hacer click en la imagen del modal
modalImg.onclick = function(e) {
  e.stopPropagation();
  zoomed = !zoomed;
  if (zoomed) {
    this.style.transform = "scale(2)";
    this.style.cursor = "zoom-out";
  } else {
    this.style.transform = "scale(1)";
    this.style.cursor = "zoom-in";
  }
}