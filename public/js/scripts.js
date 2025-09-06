const modal = document.getElementById("modal-img");
const img = document.getElementById("img-invitacion");
const modalImg = document.getElementById("img-modal-content");
const closeBtn = document.getElementById("close-modal");
let zoomed = false;
let isDragging = false;
let startX,
  startY,
  lastX = 0,
  lastY = 0;

img.onclick = function () {
  modal.classList.add("show");
  modalImg.src = this.src;
  document.body.style.overflow = "hidden";
  modalImg.style.transform = "scale(1)";
  modalImg.classList.remove("zoomed");
  lastX = lastY = 0;
  zoomed = false;
  modalImg.style.cursor = "zoom-in";
};
closeBtn.onclick = function () {
  modal.classList.remove("show");
  document.body.style.overflow = "";
};
modal.onclick = function (e) {
  if (e.target === modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
};

// Zoom y pan
modalImg.onclick = function (e) {
  e.stopPropagation();
  zoomed = !zoomed;
  if (zoomed) {
    this.style.transform = `scale(2)`;
    this.classList.add("zoomed");
    this.style.cursor = "grab";
  } else {
    this.style.transform = "scale(1)";
    this.classList.remove("zoomed");
    this.style.cursor = "zoom-in";
    lastX = lastY = 0;
  }
};

// Pan (arrastrar) cuando está en zoom
modalImg.addEventListener("mousedown", function (e) {
  if (!zoomed) return;
  isDragging = true;
  startX = e.clientX - lastX;
  startY = e.clientY - lastY;
  this.style.cursor = "grabbing";
});
window.addEventListener("mousemove", function (e) {
  if (!isDragging) return;
  lastX = e.clientX - startX;
  lastY = e.clientY - startY;
  modalImg.style.transform = `scale(2) translate(${lastX}px, ${lastY}px)`;
});
window.addEventListener("mouseup", function () {
  if (!isDragging) return;
  isDragging = false;
  if (zoomed) modalImg.style.cursor = "grab";
});
modalImg.addEventListener("mouseleave", function () {
  isDragging = false;
  if (zoomed) modalImg.style.cursor = "grab";
});

// Cuenta regresiva
// Fecha del evento (ejemplo: 30 noviembre 2025, 20:00 hrs)
const eventDate = new Date("Sep 26, 2025 20:00:00").getTime();

const x = setInterval(function () {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById(
    "timer"
  ).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "¡El evento ha comenzado!";
  }
}, 1000);

// scroll de fotos
// document.getElementById("scroll-left").onclick = function () {
//   document.getElementById("galeria-fotos").scrollBy({
//     left: -200,
//     behavior: "smooth",
//   });
// };
// document.getElementById("scroll-right").onclick = function () {
//   document.getElementById("galeria-fotos").scrollBy({
//     left: 200,
//     behavior: "smooth",
//   });
// };
const galeria = document.getElementById("galeria-fotos");
const leftBtn = document.getElementById("scroll-left");
const rightBtn = document.getElementById("scroll-right");

const desplazamiento = 300; // pixeles a mover cada vez

rightBtn.onclick = function () {
  galeria.scrollBy({ left: desplazamiento, behavior: "smooth" });
};

leftBtn.onclick = function () {
  galeria.scrollBy({ left: -desplazamiento, behavior: "smooth" });
};

// audio
// const audio = document.getElementById("mi-audio");
// audio.volume = 0.4;
// // Intentar autoplay
// audio.play().catch(() => {
//   console.log("Autoplay bloqueado, espera interacción del usuario");
// });

// // Reproducir al primer click si fue bloqueado
// window.addEventListener("click", () => {
//   if (audio.paused) audio.play();
// });
const audio = document.getElementById('mi-audio');
const btnPause = document.getElementById('btn-pause-music');
const btnPlay = document.getElementById('btn-play-music');
const musicControls = btnPause.parentElement;
audio.volume = 0.4;
// Oculta los controles al inicio
musicControls.style.display = 'none';

// Espera el primer clic en cualquier parte de la página
let musicStarted = false;
function startMusicOnFirstClick() {
  if (!musicStarted) {
    audio.play();
    musicControls.style.display = '';
    btnPause.style.display = '';
    btnPlay.style.display = 'none';
    musicStarted = true;
    document.removeEventListener('click', startMusicOnFirstClick);
  }
}
document.addEventListener('click', startMusicOnFirstClick);

// Control de botones
btnPause.onclick = function() {
  audio.pause();
  btnPause.style.display = 'none';
  btnPlay.style.display = '';
};
btnPlay.onclick = function() {
  audio.play();
  btnPlay.style.display = 'none';
  btnPause.style.display = '';
};