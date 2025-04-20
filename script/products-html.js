import { fetchListings } from './api/listings.js';
import { cart, addToCart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';

async function renderProducts() {
  try {
    const listings = await fetchListings();

    listings.forEach((product) => {
      const imageUrl = product.image && product.image.url
        ? product.image.url
        : 'https://via.placeholder.com/300x200?text=No+Image';
    
      const imageAlt = product.image && product.image.alt
        ? product.image.alt
        : product.title || 'Game image';
    
      productsHTML += `
        <div class="col-1">
          <img src="${imageUrl}" alt="${imageAlt}" />
          <h4>${product.title}</h4>
          <p>$${formatCurrency(product.price * 100)}</p>
          <button class="btn js-add-to-cart" data-product-id="${product.id}">
            <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      `;
    });
    

    document.querySelector('.js-row-1').innerHTML = productsHTML;
    setupAddToCartButtons();
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    document.querySelector('.js-row-1').innerHTML = `<p>Sorry, something went wrong while loading products.</p>`;
  }
}

function setupAddToCartButtons() {
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();
      });
    });
}

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

renderProducts();
