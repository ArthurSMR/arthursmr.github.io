(() => {
  const buttons = [...document.querySelectorAll('.rsvp-button')];
  const status = document.getElementById('rsvp-status');
  const answers = {
    yes: 'Presença na torcida confirmada. Te esperamos em Pembroke! ⚽',
    maybe: 'Anotamos como talvez. Esperamos te ver na torcida!',
    no: 'Resposta anotada. Fica pra próxima!'
  };

  try {
    const saved = localStorage.getItem('friendly-match-answer');
    if (saved && answers[saved]) setAnswer(saved, false);
  } catch (_) { /* A página continua funcional mesmo com armazenamento desativado. */ }

  buttons.forEach(button => button.addEventListener('click', () => setAnswer(button.dataset.answer, true)));

  function setAnswer(answer, save) {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.answer === answer)));
    status.textContent = answers[answer];
    if (save) {
      try { localStorage.setItem('friendly-match-answer', answer); } catch (_) { /* Resposta mantida na página atual. */ }
    }
  }

  const revealItems = document.querySelectorAll('.section-kicker, .matchup-row, .playful-note, .details-grid, .rsvp-copy, .rsvp-actions');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    revealItems.forEach(item => { item.classList.add('reveal'); observer.observe(item); });
  }
})();
