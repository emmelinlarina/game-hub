export const cart = [
   { productId: 'game-001',
    quantity: 1,}

];

export function addToCart(productId) {
    let matchingItem;
       
       cart.forEach((cartItem) => {
           if (productId === cartItem.productId) {
               matchingItem = cartItem;
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
}