function createOrderSystem() {
  let cart = [];

  function addToCart(name, price, qty) {
    cart.push({ name, price, qty });
    return cart.length;
  }

  function getCartSize() {
    return cart.length;
  }

  function checkout(distance) {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    let shippingFee;
    if (distance <= 5) {
      shippingFee = 15000;
    } else if (distance <= 20) {
      shippingFee = 30000;
    } else {
      shippingFee = 50000;
    }

    if (subtotal >= 500000) shippingFee = 0;

    const finalTotal = subtotal + shippingFee;
    cart = [];

    return { subtotal, shippingFee, finalTotal };
  }

  return { addToCart, getCartSize, checkout };
}