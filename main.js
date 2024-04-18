'use strict';

import * as mobileMenu from './src/js/mobile-menu.js';

mobileMenu.addMobileMenuListener();

const greetMenuBtn = document.querySelector('.greet-menu-btn');
const recomMenyBtn = document.querySelector('.recom-menu-btn');
const favButton = document.querySelector('.fav-button');

greetMenuBtn.addEventListener('click', event => {
  window.location.href = './src/html/menu.html';
});

recomMenyBtn.addEventListener('click', event => {
  window.location.href = './src/html/menu.html';
});

favButton.addEventListener('click', event => {
  window.location.href = './src/html/favourite.html';
});
