const $ = (selector) => document.querySelector(selector);
const screens = {
  gate: $('#gateScreen'),
  garden: $('#gardenScreen'),
  letter: $('#letterScreen'),
  gallery: $('#galleryScreen')
};

const bgMusic = $('#bgMusic');
const musicToggle = $('#musicToggle');
const pinInput = $('#pinInput');
const pinMessage = $('#pinMessage');
const gardenGate = $('#gardenGate');
const goldEnvelope = $('#goldEnvelope');
const typedLetter = $('#typedLetter');
const skipBtn = $('#skipBtn');
const galleryBtn = $('#galleryBtn');

let typingTimer = null;
let fullLetterText = '';
let isTypingDone = false;

function applyConfig() {
  document.title = LOVE_CONFIG.title || 'Secret Garden Love Letter';
  $('#siteTitle').textContent = LOVE_CONFIG.title;
  $('#siteSubtitle').textContent = LOVE_CONFIG.subtitle;
  $('#recipientName').textContent = LOVE_CONFIG.recipientName;
  $('#senderName').textContent = LOVE_CONFIG.senderName;
  $('#unlockBtn').textContent = LOVE_CONFIG.buttonText.unlock;
  $('#openEnvelopeBtn').textContent = LOVE_CONFIG.buttonText.openEnvelope;
  $('#galleryBtn').textContent = LOVE_CONFIG.buttonText.seeGallery;
  $('#skipBtn').textContent = LOVE_CONFIG.buttonText.skip;
  musicToggle.querySelector('b').textContent = LOVE_CONFIG.buttonText.playMusic;
  bgMusic.src = LOVE_CONFIG.music;
}

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function unlockGate() {
  if (pinInput.value.trim() !== LOVE_CONFIG.gatePin) {
    pinMessage.textContent = 'PIN salah, gerbang taman belum mau terbuka.';
    gardenGate.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(0)' }
    ], { duration: 330 });
    return;
  }

  pinMessage.textContent = 'Gerbang terbuka... selamat datang di taman rahasia.';
  gardenGate.classList.add('open');
  tryPlayMusic();
  setTimeout(() => showScreen('garden'), 1450);
}

function openEnvelope() {
  goldEnvelope.classList.add('open');
  setTimeout(() => {
    showScreen('letter');
    startTypingLetter();
  }, 950);
}

function startTypingLetter() {
  clearInterval(typingTimer);
  isTypingDone = false;
  typedLetter.textContent = '';
  skipBtn.classList.remove('hidden');
  galleryBtn.classList.add('hidden');
  fullLetterText = (LOVE_CONFIG.letter || []).join('\n\n');

  let i = 0;
  const speed = Number(LOVE_CONFIG.typingSpeed) || 35;
  typingTimer = setInterval(() => {
    typedLetter.textContent += fullLetterText.charAt(i);
    i++;
    if (i >= fullLetterText.length) finishTyping();
  }, speed);
}

function finishTyping() {
  clearInterval(typingTimer);
  typedLetter.textContent = fullLetterText;
  isTypingDone = true;
  skipBtn.classList.add('hidden');
  galleryBtn.classList.remove('hidden');
}

function buildGallery() {
  const gallery = $('#flowerGallery');
  gallery.innerHTML = '';

  LOVE_CONFIG.gallery.forEach((item, index) => {
    const card = document.createElement('button');
    card.className = 'flower-card';
    card.type = 'button';
    card.innerHTML = `
      <div class="flower" aria-hidden="true">
        ${[0, 60, 120, 180, 240, 300].map((r) => `<span class="petal" style="--r:${r}deg"></span>`).join('')}
        <span class="flower-center">${index + 1}</span>
      </div>
      <div class="flower-caption">${escapeHtml(item.caption)}</div>
    `;
    card.addEventListener('click', () => openPhoto(item, card));
    gallery.appendChild(card);
  });
}

function openPhoto(item, card) {
  card.classList.add('opened');
  $('#modalImg').src = item.src;
  $('#modalCaption').textContent = item.caption;
  $('#photoModal').classList.add('show');
  $('#photoModal').setAttribute('aria-hidden', 'false');
}

function closePhoto() {
  $('#photoModal').classList.remove('show');
  $('#photoModal').setAttribute('aria-hidden', 'true');
}

function spawnPetal() {
  const petal = document.createElement('span');
  petal.className = 'falling-petal';
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = (7 + Math.random() * 7) + 's';
  petal.style.setProperty('--drift', (Math.random() * 180 - 90) + 'px');
  petal.style.transform = `rotate(${Math.random() * 180}deg)`;
  $('#petalLayer').appendChild(petal);
  setTimeout(() => petal.remove(), 15000);
}

function buildButterflies() {
  const layer = $('#butterflyLayer');
  for (let i = 0; i < 9; i++) {
    const b = document.createElement('span');
    b.className = 'butterfly';
    b.style.left = Math.random() * 96 + 'vw';
    b.style.top = (12 + Math.random() * 62) + 'vh';
    b.style.setProperty('--x', (Math.random() * 90 - 45) + 'px');
    b.style.setProperty('--y', (Math.random() * 90 - 45) + 'px');
    b.style.setProperty('--dur', (3 + Math.random() * 4) + 's');
    layer.appendChild(b);
  }
}

function tryPlayMusic() {
  if (!bgMusic.src) return;
  bgMusic.volume = 0.42;
  bgMusic.play()
    .then(() => musicToggle.classList.add('playing'))
    .catch(() => musicToggle.classList.remove('playing'));
}

function toggleMusic() {
  if (bgMusic.paused) tryPlayMusic();
  else {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

$('#unlockBtn').addEventListener('click', unlockGate);
pinInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') unlockGate(); });
$('#openEnvelopeBtn').addEventListener('click', openEnvelope);
goldEnvelope.addEventListener('click', openEnvelope);
goldEnvelope.addEventListener('keydown', (e) => { if (e.key === 'Enter') openEnvelope(); });
skipBtn.addEventListener('click', finishTyping);
galleryBtn.addEventListener('click', () => showScreen('gallery'));
$('#closeModal').addEventListener('click', closePhoto);
$('#photoModal').addEventListener('click', (e) => { if (e.target.id === 'photoModal') closePhoto(); });
musicToggle.addEventListener('click', toggleMusic);

applyConfig();
buildGallery();
buildButterflies();
setInterval(spawnPetal, 450);

if (LOVE_CONFIG.musicAutoplay) {
  document.addEventListener('click', tryPlayMusic, { once: true });
}
