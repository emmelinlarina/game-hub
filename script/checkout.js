import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

function renderCart() {
  let cartSummaryHTML = '';

  if (cart.length === 0) {
    cartSummaryHTML = `
      <div class="empty-cart-message">
        <p>😢 It's empty in here...</p>
        <p><a href="products.html">Browse games and fill it up 🎮</a></p>
      </div>
    `;
  } else {
    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      const matchingProduct = products.find((product) => product.id === productId);

      cartSummaryHTML += `
        <div class="box">
          <div class="content">
            <img src="${matchingProduct.image}" alt="Frontcover of ${matchingProduct.name}">
            <h3>${matchingProduct.name}</h3>
            <h4>$${formatCurrency(matchingProduct.priceCents)}</h4>
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <p class="btn-area">
              <i class="fa-solid fa-trash"></i>
              <span class="btn2 js-trash" data-product-id="${matchingProduct.id}">Remove</span>
            </p>
          </div>
        </div>
      `;
    });
  }

  // 🛒 Display everything in cart section
  document.querySelector('.js-shop').innerHTML = `
    <h1>YOUR CART</h1>
    ${cartSummaryHTML}
  `;

  // 💸 Update right side totals
  if (cart.length > 0) {
    let subtotal = 0;

    cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      subtotal += product.priceCents * cartItem.quantity;
    });

    const totalFormatted = formatCurrency(subtotal);

    document.querySelector('.right-bar').innerHTML = `
      <p><span>Subtotal</span> <span>$${totalFormatted}</span></p>
      <hr>
      <p class="total"><span>TOTAL</span> <span>$${totalFormatted}</span></p>
    `;
  } else {
    document.querySelector('.right-bar').innerHTML = `
      <p class="empty-total">No items to total 💸</p>
    `;
  }

  // 🧹 Activate "Remove" buttons
  setupDeleteButtons();
}

function setupDeleteButtons() {
  document.querySelectorAll('.js-trash').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);
      renderCart(); // Refresh cart visually
    });
  });
}

// 🧠 Load cart on page open
renderCart();
