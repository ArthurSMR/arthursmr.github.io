const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const contactForm = document.querySelector('[data-contact-form]');
const formNote = document.querySelector('[data-form-note]');
const progressBar = document.querySelector('[data-scroll-progress]');
const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
const processLine = document.querySelector('.process-line');
const storySections = [...document.querySelectorAll('main > section:not(.hero)')].map((section) => ({
  section,
  layer: section.querySelector(':scope > .container'),
})).filter(({ layer }) => layer);
const productStage = document.querySelector('[data-product-stage]');
const productVisuals = [...document.querySelectorAll('[data-product-visual]')];
const productChapters = [...document.querySelectorAll('[data-product-chapter]')];
const stageReadout = document.querySelector('[data-stage-readout]');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
if (processLine) observer.observe(processLine);

const activateProduct = (product) => {
  productVisuals.forEach((visual) => visual.classList.toggle('is-active', visual.dataset.productVisual === product));
  productChapters.forEach((chapter) => chapter.classList.toggle('is-active', chapter.dataset.productChapter === product));
  if (stageReadout) stageReadout.textContent = product === 'ozone' ? 'OZÔNIO / INDUSTRIAL' : 'LASER / TEXTILE';
};

const productObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.45) activateProduct(entry.target.dataset.productChapter);
  });
}, { threshold: [0.45, 0.65], rootMargin: '-12% 0px -24% 0px' });

productChapters.forEach((chapter) => productObserver.observe(chapter));

productStage?.addEventListener('pointermove', (event) => {
  const rect = productStage.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  productStage.style.setProperty('--stage-tilt-x', `${(-y * 1.8).toFixed(2)}deg`);
  productStage.style.setProperty('--stage-tilt-y', `${(x * 2.4).toFixed(2)}deg`);
});

productStage?.addEventListener('pointerleave', () => {
  productStage.style.setProperty('--stage-tilt-x', '0deg');
  productStage.style.setProperty('--stage-tilt-y', '0deg');
});

let scrollTicking = false;

const updateScrollEffects = () => {
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? Math.min(window.scrollY / scrollRange, 1) * 100 : 0;
  progressBar?.style.setProperty('width', `${progress}%`);

  const heroShift = Math.min(window.scrollY * 0.08, 72);
  document.documentElement.style.setProperty('--hero-shift', `${heroShift}px`);

  parallaxItems.forEach((item) => {
    if (item.classList.contains('hero-media')) return;
    const speed = Number(item.dataset.parallax) || 0;
    const rect = item.getBoundingClientRect();
    const distance = (window.innerHeight / 2) - (rect.top + rect.height / 2);
    const offset = Math.max(-28, Math.min(28, distance * speed));
    item.style.setProperty('--parallax-offset', `${offset}px`);
  });

  storySections.forEach(({ section, layer }) => {
    const rect = section.getBoundingClientRect();
    const centerDistance = ((rect.top + rect.height * 0.34) - (window.innerHeight * 0.5)) / (window.innerHeight * 0.9);
    const progress = Math.max(-1, Math.min(1, centerDistance));
    layer.style.setProperty('--story-tilt', `${(progress * 2.8).toFixed(2)}deg`);
    layer.style.setProperty('--story-lift', `${(progress * -10).toFixed(1)}px`);
    layer.style.setProperty('--story-scale', `${(1 - Math.abs(progress) * 0.018).toFixed(3)}`);
  });

  scrollTicking = false;
};

const requestScrollEffects = () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollEffects);
    scrollTicking = true;
  }
};

window.addEventListener('scroll', requestScrollEffects, { passive: true });
window.addEventListener('resize', requestScrollEffects);
requestScrollEffects();

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formNote.textContent = 'Mensagem registrada nesta demonstração.';
  formNote.style.color = '#b7e1ff';
  contactForm.reset();
});
