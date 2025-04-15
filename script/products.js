const products = [{
    image: 'images/games/spacewar.jpg',
    name: 'Space War',
    priceCents: 3999

}, {
    image: 'images/games/forgelegend.jpg',
    name: 'Forge Legend',
    priceCents: 3599
}, {
    image: 'images/games/black.jpg',
    name: 'Black',
    priceCents: 2199
}, {
    image: 'images/games/assassin.jpg',
    name: 'Assassin',
    priceCents: 3999
}, {
    image: 'images/games/superduper.jpg',
    name: 'Super Duper',
    priceCents: 1999
}, {
    image: 'images/games/furious.jpg',
    name: 'Furious',
    priceCents: 4499
}, {
    image: 'images/games/cyberpunk.jpg',
    name: 'Cyberpunk',
    priceCents: 5499
}, {
    image: 'images/games/racing.jpg',
    name: 'Racing',
    priceCents: 4999
}, {
    image: 'images/games/boxer.jpg',
    name: 'Boxer',
    priceCents: 3999
}, {
    image: 'images/games/pingpong.jpg',
    name: 'Ping Pong',
    priceCents: 2999
}]; 

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
