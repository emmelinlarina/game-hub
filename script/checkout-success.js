import { cart, removeFromCart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

document.body.classList.add('loading');

function hideLoader() {
  document.getElementById('page-loader').style.display = 'none';
  document.body.classList.remove('loading');
  window.scrollTo(0, 0);
}

function renderCart() { 
        listContainer.appendChild(item);
};
    

    function init() {
    hideLoader();
    renderCart();
    }

    init();
