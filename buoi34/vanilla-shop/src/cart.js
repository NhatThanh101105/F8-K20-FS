// Cart module - manages cart state in memory

let cartItems = [];
let listeners = [];

export function getCartItems() {
  return [...cartItems];
}

export function getCartCount() {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal() {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function addToCart(product) {
  const existing = cartItems.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  notifyListeners();
}

export function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);
  notifyListeners();
}

export function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const item = cartItems.find((item) => item.id === productId);
  if (item) {
    item.quantity = quantity;
    notifyListeners();
  }
}

export function clearCart() {
  cartItems = [];
  notifyListeners();
}

export function onCartChange(listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener(getCartItems()));
}
