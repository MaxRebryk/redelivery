export default function cartCount() {
  const cartCounter = document.querySelector('.cart-counter');
  const cartCounterMobile = document.querySelector('.cart-counter-mobile');
  const orderStorage = localStorage.getItem('order');
  let orderArray = JSON.parse(orderStorage);
  // Перевірка на наявність масиву
  if (orderArray) {
    cartCounter.textContent = orderArray.length;
    cartCounterMobile.textContent = orderArray.length;
  } else {
    cartCounter.textContent = '0'; // Якщо масив порожній
    cartCounterMobile.textContent = '0';
  }
}
