import { showLoader, hideLoader } from './utils/loader.js';

// Vis loader med en gang
showLoader();

// Skjul loader når alt er klart
window.addEventListener('load', () => {
  hideLoader();
  window.scrollTo(0, 0);
});