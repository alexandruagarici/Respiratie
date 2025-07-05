// Elemente UI
const status    = document.getElementById('status');
const tempo     = document.getElementById('tempo');
const tempoValue= document.getElementById('tempoValue');
const startBtn  = document.getElementById('startBtn');
const stopBtn   = document.getElementById('stopBtn');
const layer     = document.getElementById('breathLayer');

let isBreathing  = false;
let breathTimeout;

// Actualizează afișarea valorii slider-ului
tempo.addEventListener('input', () => {
  tempoValue.textContent = tempo.value;
});

// Pornește animația de respirație
startBtn.addEventListener('click', () => {
  isBreathing = true;
  startBtn.style.display = 'none';
  stopBtn.style.display  = 'inline-block';
  status.style.display   = 'none';
  animateBreath();
});

// Oprește animația
stopBtn.addEventListener('click', () => {
  isBreathing = false;
  clearTimeout(breathTimeout);
  layer.style.transition = '';
  layer.style.height     = '0%';
  stopBtn.style.display  = 'none';
  startBtn.style.display = 'inline-block';
  status.style.display   = 'block';
  status.textContent     = 'Antrenament oprit';
});

// Funcția recursivă de animație
function animateBreath() {
  if (!isBreathing) return;

  const bpm     = +tempo.value;
  const inhale  = (60 / bpm) * 1000; // milisecunde
  const exhale  = inhale;            // schema 1: egal

  // Inspir: umple stratul până la 100%
  layer.style.transition = `height ${inhale}ms ease-in`;
  layer.style.height     = '100%';

  breathTimeout = setTimeout(() => {
    if (!isBreathing) return;

    // Expir: golește stratul înapoi la 0%
    layer.style.transition = `height ${exhale}ms ease-out`;
    layer.style.height     = '0%';

    // După expir, reapelează funcția
    breathTimeout = setTimeout(animateBreath, exhale);
  }, inhale);
}
