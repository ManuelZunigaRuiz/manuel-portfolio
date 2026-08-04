/* =====================================================
   MANUEL RUIZ ZUNIGA PORTFOLIO
   Global Core Logic
   Version: 1.2 (Added High-Performance Scroll Reveal)
===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initEmailCopy();
  initScrollAnimations();
});

/**
 * Gestisce l'interazione e la copia dell'indirizzo email negli appunti
 * per qualsiasi componente di copia presente nella pagina.
 */
function initEmailCopy() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const wrapper = btn.closest('.contact-action-wrapper');
      if (!wrapper) return;

      const emailLink = wrapper.querySelector('.contact-value-email');
      const copyIconSymbol = btn.querySelector('.copy-icon-symbol');
      if (!emailLink || !copyIconSymbol) return;

      const emailAddress = emailLink.textContent.trim();

      try {
        await navigator.clipboard.writeText(emailAddress);
        
        copyIconSymbol.textContent = '✓';
        btn.style.borderColor = 'var(--accent-globuy)';
        copyIconSymbol.style.color = 'var(--accent-globuy)';

        setTimeout(() => {
          copyIconSymbol.textContent = '📋';
          btn.style.borderColor = '';
          copyIconSymbol.style.color = '';
        }, 2000);

      } catch (err) {
        console.warn('Impossibile copiare negli appunti automaticamente: ', err);
      }
    });
  });
}

/**
 * Inizializza l'Intersection Observer per rivelare in modo fluido
 * gli elementi quando entrano nella viewport dell'utente (Scroll Reveal)
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null, // Rileva rispetto al viewport del browser
    rootMargin: '0px',
    threshold: 0.1 // L'elemento si rivela quando è visibile al 10%
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Aggiunge la classe che fa salire e apparire la sezione
        entry.target.classList.add('active');
        // Rimuove l'osservatore per evitare di ripetere l'animazione ad ogni scorrimento
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Trova tutte le sezioni che hanno la classe di reveal impostata
  const animatedElements = document.querySelectorAll('.reveal-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
}