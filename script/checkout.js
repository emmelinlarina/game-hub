import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

function renderCart() {
  let cartHTML = '';
  let subtotalCents = 0;

  
  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    subtotalCents += product.priceCents * cartItem.quantity;

    cartHTML += `
      <div class="box js-cart-item-container-${product.id}">
        <div class="content">
          <img src="${product.image}" alt="Frontcover of ${product.name}">
          <h3>${product.name}</h3>
          <h4>${formatCurrency(product.priceCents)}</h4>
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
    <p><span>Subtotal</span> <span>${subtotalFormatted}</span></p>
    <hr>
    <p class="total"><span>TOTAL</span> <span>${subtotalFormatted}</span></p>
  `;

  setupDeleteButtons(); 
}

function setupDeleteButtons() {
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      
      removeFromCart(productId);

      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      if (container) container.remove();

      
      const product = products.find((p) => p.id === productId);
      console.log(`Removed: ${product.name}`);

      
      renderCart();
    });
  });
}


renderCart();
