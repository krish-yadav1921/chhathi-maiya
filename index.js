// elements
const sun = document.getElementById('sun');
const message = document.getElementById('message');
const nextBtn = document.getElementById('nextBtn');
const menu = document.getElementById('menu');
const gallery = document.getElementById('gallery');
const morningBtn = document.getElementById('morningBtn');
const eveningBtn = document.getElementById('eveningBtn');

// animation timing (should match CSS transition duration roughly)
const LEAVE_DURATION = 900; // milliseconds - matches CSS opacity/transform timing (0.9s)

// use pointerdown for both touch and mouse
let sunClicked = false;
sun.addEventListener('pointerdown', (e) => {
  if (sunClicked) return;
  sunClicked = true;

  // add leaving class to trigger CSS move+fade
  sun.classList.add('leaving');

  // optional: small sound or haptic could be played here (if you add an <audio>)
  // after leave animation completes, show message (or whatever you want)
  setTimeout(() => {
    // hide the sun element from layout (keep it removed from pointer events)
    sun.style.display = 'none';

    // show the greeting/message box
    if (message) {
      message.style.display = 'block';
    } else {
      // fallback: if no message element, open menu directly
      if (menu) menu.style.display = 'block';
    }
  }, LEAVE_DURATION);
});

// next button → open menu
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (message) message.style.display = 'none';
    if (menu) menu.style.display = 'block';
  });
}

// simple gallery logic
if (morningBtn) morningBtn.addEventListener('click', () => showGallery('morning'));
if (eveningBtn) eveningBtn.addEventListener('click', () => showGallery('evening'));

function showGallery(time) {
  if (!gallery || !menu) return;
  gallery.style.display = 'grid';
  menu.style.display = 'none';

  let images = (time === 'morning') ? [
    'https://i.ibb.co/3rshYQp/chhath1.jpg',
    'https://i.ibb.co/gZp8CTT/chhath2.jpg',
    'https://i.ibb.co/FwnyRv6/chhath3.jpg'
  ] : [
    'https://i.ibb.co/tQYz5rr/chhath4.jpg',
    'https://i.ibb.co/N1CKp7y/chhath5.jpg',
    'https://i.ibb.co/fxW5z3m/chhath6.jpg'
  ];

  gallery.innerHTML = `
    <h2>${time === 'morning' ? '🌅 Subha Puja Photos' : '🌇 Shaam Puja Photos'}</h2>
    ${images.map(img => `<img src="${img}" alt="${time} photo">`).join('')}
    <button id="backBtn">⬅️ Back</button>
  `;

  document.getElementById('backBtn').addEventListener('click', () => {
    gallery.style.display = 'none';
    menu.style.display = 'block';
  });
}
