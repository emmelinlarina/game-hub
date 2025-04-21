import { fetchListings } from './api/listings.js';
import { addToCart, cart, removeFromCart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
  
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  async function renderHomepageProducts() {
    try {
        const listings = await fetchListings();
        const bestSellers = document.querySelector('.js-best-sellers');
        if (!bestSellers) return;

        let homeProductsHTML = '';

        listings.slice(0, 3).forEach((product) => {
            const imageUrl = product.image?.url || 'images/placeholder.jpg';
            const imageAlt = product.image?.alt || product.title;
            

        homeProductsHTML += `
            <div class="column">
                    
                <img src="${imageUrl}" alt="${imageAlt}">
                    
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
        console.error('Failed to fetch', err)
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