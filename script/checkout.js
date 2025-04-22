import { cart, removeFromCart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

document.body.classList.add('loading');

function hideLoader() {
  document.getElementById('page-loader').style.display = 'none';
  document.body.classList.remove('loading');
  window.scrollTo(0, 0);
}

function renderCart() {
  let cartHTML = '';
  let subtotalCents = 0;

  cart.forEach((cartItem) => {
    const product = cartItem.product;
    if (!product || typeof product.price !== 'number') {
      return;
    }

    subtotalCents += product.price * 100 * cartItem.quantity;

    cartHTML += `
      <div class="box js-cart-item-container-${product.id}">
        <div class="content">
          <img src="${product.image?.url || 'images/placeholder.jpg'}" alt="Frontcover of ${product.title}">
          <h3>${product.title}</h3>
          <h4>$${formatCurrency(product.price * 100)}</h4>
          <span>Quantity: ${cartItem.quantity}</span>
          <p class="btn-area">
            <span class="btn2 js-delete-link" data-product-id="${product.id}">
              <i class="fa-solid fa-trash"></i> Remove
            </span>
          </p>
        </div>
      </div>
    `;
  });

  const shopContainer = document.querySelector('.js-shop');
  const rightBar = document.querySelector('.right-bar');

  if (cart.length === 0) {
    shopContainer.innerHTML = `
      <div class="empty-cart-message">
        <h2>It's empty in here... 😢</h2>
        <a href="products.html">Go find some games to fill it up</a>
      </div>
    `;
    rightBar.innerHTML = ``;
    return;
  }

  shopContainer.innerHTML = cartHTML;
  const subtotalFormatted = formatCurrency(subtotalCents);
  rightBar.innerHTML = `
    <p><span>Subtotal</span> <span>$${subtotalFormatted}</span></p>
    <hr>
    <p class="total"><span>TOTAL</span> <span>$${subtotalFormatted}</span></p>
  `;

  setupDeleteButtons();
}

function setupDeleteButtons() {
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      // Make sure the ID is found and removed properly
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      if (container) container.remove();

      renderCart();
       
    });
  });hideLoader();
}

renderCart();