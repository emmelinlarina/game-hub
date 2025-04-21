import { cart } from "../../data/cart";

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