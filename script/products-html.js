import { fetchListings } from './api/listings.js';
import { cart, addToCart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

let allListings = [];

async function renderProducts(filteredListings = allListings) {
  let productsHTML = '';

  filteredListings.forEach((product) => {
    const imageUrl = product.image?.url || 'images/placeholder.jpg';
    const imageAlt = product.image?.alt || product.title;

    productsHTML += `
      <div class="col-1">
        <img src="${imageUrl}" alt="${imageAlt}" />
        <h4>${product.title}</h4>
        <p>$${formatCurrency(product.price * 100)}</p>
        <p class="genre">${product.genre || 'Unknown Genre'}</p>
        <button class="btn js-add-to-cart" data-product-id="${product.id}">
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    `;
  });

  document.querySelector('.js-row-1').innerHTML = productsHTML;
  setupAddToCartButtons();
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

function setupFilters() {
  const priceSort = document.querySelector('#sort-price');
  const genreFilter = document.querySelector('#filter-genre');

  priceSort.addEventListener('change', () => {
    const sorted = [...allListings].sort((a, b) => {
      return priceSort.value === 'low' ? a.price - b.price : b.price - a.price;
    });
    renderProducts(sorted);
  });

  genreFilter.addEventListener('change', () => {
    const filtered = allListings.filter(product => 
      genreFilter.value === 'all' || product.genre.toLowerCase() === genreFilter.value.toLowerCase()
    );
    renderProducts(filtered);
  });
}

document.querySelector('#reset-filters').addEventListener('click', () => {
  document.querySelector('#sort-price').value = 'default';
  document.querySelector('#filter-genre').value = 'all';
  renderProducts(allListings);
})

async function init() {
  try {
    allListings = await fetchListings();

    // Populate genre filter dropdown
    const genres = [...new Set(allListings.map(item => item.genre).filter(Boolean))];
    const genreFilter = document.querySelector('#filter-genre');
    genreFilter.innerHTML += genres.map(genre =>
      `<option value="${genre}">${genre}</option>`
    ).join('');

    renderProducts();
    setupFilters();
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    document.querySelector('.js-row-1').innerHTML = `<p>Sorry, something went wrong while loading products.</p>`;
  }
}

init();
