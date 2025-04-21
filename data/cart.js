export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
  let matchingItem = cart.find((item) => item.product?.id === product.id);

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const itemIndex = cart.findIndex((cartItem) => cartItem.product.id === productId);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1); // remove the whole item if quantity is 1
    }

    saveToStorage();
  }
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  const quantityElement = document.querySelector('.js-cart-quantity');
  if (quantityElement) {
    quantityElement.innerHTML = cartQuantity;
  }
}