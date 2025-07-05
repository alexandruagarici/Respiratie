const status = document.getElementById('status');
const tempo = document.getElementById('tempo');
const tempoValue = document.getElementById('tempoValue');
const startBtn = document.getElementById('startBtn');

tempo.addEventListener('input', () => {
  tempoValue.textContent = tempo.value;
});

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  status.style.display = 'none';
  animateBreath();
});

function animateBreath() {
  const layer = document.getElementById('breathLayer');
  const bpm = +tempo.value;
  const inhale = (60 / bpm) * 1000;
  const exhale = inhale;

  layer.style.transition = `height ${inhale}ms ease-in`;
  layer.style.height = '100%';

  setTimeout(() => {
    layer.style.transition = `height ${exhale}ms ease-out`;
    layer.style.height = '0%';
    setTimeout(animateBreath, exhale);
  }, inhale);
}
