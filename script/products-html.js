import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

let productsHTML = '';


products.forEach((product) => {
    const productLink = product.name.toLowerCase().replaceAll(' ','') + '.html';

    productsHTML += `
    <div class="col-1">
        <a href="spacewar.html"> <img src="${product.image}" alt="a picture of the game ${product.name}">
        </a>
        <h4>${product.name}</h4>
        <p>$${(product.priceCents / 100).toFixed(2)}</p>
         
            <button class="btn js-add-to-cart"
            data-product-id="${product.id}" >
            <i class="fa-solid fa-cart-shopping"></i>
            </button>
            
    </div>
    `;
    
});

document.querySelector('.js-row-1').innerHTML = productsHTML;

function updateCartQuantity() {
    let cartQuantity = 0;

        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;  
}

document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        addToCart(productId);
        updateCartQuantity();
        
    });
});
