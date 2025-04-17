import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

let cartSummaryHTML = '';


cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
    if (product.id === productId) {
        matchingProduct = product;
    }
    });

    
    cartSummaryHTML += `

        <div class="box">
                <div class="content">
                <img src="${matchingProduct.image}" alt="Frontcover of ${matchingProduct.image}">
                    <h3>${matchingProduct.name}</h3>
                    <h4>${matchingProduct.priceCents / 100}</h4>
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <p class="btn-area">
                        <i class="fa-solid fa-trash"></i>
                        <span class="btn2">Remove</span>
                    </p>
                </div>
        </div>
    `;
});

document.querySelector('.js-shop').innerHTML = cartSummaryHTML;


