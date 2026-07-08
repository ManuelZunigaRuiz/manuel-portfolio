/* =====================================================
   MANUEL RUIZ ZUNIGA PORTFOLIO
   Global Core Logic
   Version: 1.0
===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initEmailCopy();
});

/**
 * Gestisce l'interazione e la copia dell'indirizzo email negli appunti
 */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailLink = document.getElementById('email-link');
  const copyIconSymbol = document.getElementById('copy-icon-symbol');

  if (!copyBtn || !emailLink || !copyIconSymbol) return;

  copyBtn.addEventListener('click', async () => {
    const emailAddress = emailLink.textContent.trim();

    try {
      // Utilizzo delle moderne API per appunti del browser
      await navigator.clipboard.writeText(emailAddress);
      
      // Feedback Visivo (Stripe/Linear style)
      copyIconSymbol.textContent = '✓';
      copyBtn.style.borderColor = 'var(--accent-globuy)';
      copyIconSymbol.style.color = 'var(--accent-globuy)';

      // Ripristino dello stato originale dopo 2 secondi
      setTimeout(() => {
        copyIconSymbol.textContent = '📋';
        copyBtn.style.borderColor = '';
        copyIconSymbol.style.color = '';
      }, 2000);

    } catch (err) {
      console.warn('Impossibile copiare negli appunti automaticamente: ', err);
    }
  });
}
