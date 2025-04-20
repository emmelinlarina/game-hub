export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add product object to cart
export function addToCart(product) {
  if (!product || !product.id) {
    console.error('Invalid product passed to addToCart:', product);
    return;
  }

  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.product && product.id === cartItem.product.id) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      product: product,
      quantity: 1
    });
  }

  saveToStorage();
}

// Remove product from cart by ID
export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.product?.id !== productId);
  saveToStorage();
}