let productsHTML = '';


products.forEach((product) => {
    const productLink = product.name.toLowerCase().replaceAll(' ','') + '.html';

    productsHTML += `
    <div class="col-1">
        <a href="spacewar.html"> <img src="${product.image}" alt="a picture of the game ${product.name}">
        </a>
        <h4>${product.name}</h4>
        <p>$${(product.priceCents / 100).toFixed(2)}</p>
        <a href="checkout.html"> 
            <button class="btn"><i class="fa-solid fa-cart-shopping"></i></button>
            </a>
    </div>
    `;
    
});

console.log(productsHTML);

document.querySelector('.js-row-1').innerHTML = productsHTML;
