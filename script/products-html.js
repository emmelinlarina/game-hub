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

document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        let matchingItem;
        
        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            cart.push({
                productId: productId,
                quantity: 1
            });
        }

        let cartQuantity = 0;

        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });

        document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;  
    });
});
