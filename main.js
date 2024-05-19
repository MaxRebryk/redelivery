'use strict';

import * as mobileMenu from './src/js/mobile-menu.js';

const greetMenuBtn = document.querySelector('.greet-menu-btn');
const recomMenuBtn = document.querySelector('.recom-menu-btn');
const favButton = document.querySelector('.fav-button');
const profileButton = document.querySelector('.profile-button');
const cartButton = document.querySelector('.cart-button');

cartCount();

function cartCount() {
  const cartCounter = document.querySelector('.cart-counter');

  const orderStorage = localStorage.getItem('order');
  let orderArray = JSON.parse(orderStorage);
  // Перевірка на наявність масиву
  if (orderArray) {
    cartCounter.textContent = orderArray.length;
  } else {
    cartCounter.textContent = '0'; // Якщо масив порожній
  }
}

recomMenuBtn.addEventListener('click', event => {
  window.location.href = './src/html/menu.html';
  npm;
});

cartButton.addEventListener('click', event => {
  window.location.href = './src/html/cart.html';
});

favButton.addEventListener('click', event => {
  window.location.href = './src/html/favourite.html';
});

profileButton.addEventListener('click', event => {
  window.location.href = './src/html/profile.html';
});

mobileMenu.addMobileMenuListener();

greetMenuBtn.addEventListener('click', event => {
  window.location.href = './src/html/menu.html';
});
