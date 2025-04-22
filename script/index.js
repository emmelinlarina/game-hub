import { fetchListings } from './api/listings.js';
import { addToCart, cart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

async function renderHomepageProducts() {
  const bestSellers = document.querySelector('.js-best-sellers');
  if (!bestSellers) return;

  bestSellers.innerHTML = `
        <div class="loader-container">
        <p class="loading">Loading best sellers...</p>
        </div>`;

  try {
    const listings = await fetchListings();
    let homeProductsHTML = '';

    listings.slice(0, 3).forEach((product) => {
      const imageUrl = product.image?.url || 'images/placeholder.jpg';
      const imageAlt = product.image?.alt || product.title;

      homeProductsHTML += `
        <div class="column">
          <a href="product.html?id=${product.id}">
            <img src="${imageUrl}" alt="${imageAlt}" />
          </a>
          <h2>${product.title}</h2>
          <p>$${formatCurrency(product.price * 100)}</p>
          <button class="btn js-add-to-cart" data-product-id="${product.id}">
            <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      `;
    });

    bestSellers.innerHTML = homeProductsHTML;

    setupAddToCartButtons(listings);
    updateCartQuantity();
  } catch (err) {
    bestSellers.innerHTML = `<p>⚠️ Failed to load products</p>`;
    console.error('Failed to fetch', err);
  }
}

function setupAddToCartButtons(products) {
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const product = products.find((p) => p.id === productId);

      if (product) {
        addToCart(product);
        updateCartQuantity();
      }
    });
  });
}

renderHomepageProducts();

function hideLoader() {
    document.getElementById('page-loader').style.display = 'none';
    document.body.classList.remove('loading');
    window.scrollTo(0, 0);
}

document.body.classList.add('loading');

renderHomepageProducts().then(hideLoader);