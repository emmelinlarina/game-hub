import { showLoader, hideLoader } from './utils/loader.js';

showLoader();

window.addEventListener('load', () => {
  hideLoader();
  window.scrollTo(0, 0);
});