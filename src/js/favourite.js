'use strict';

import { pizza, burgers, pita } from './menu-list.js';
import * as mobileMenu from '../js/mobile-menu.js';

const menu = document.querySelector('.menu-list');
const cartButton = document.querySelector('.cart-container');
const cartPcButton = document.querySelector('.cart-button');
const cartCounter = document.querySelector('.cart-counter');
const cartCounterMobile = document.querySelector('.cart-counter-mobile');
const backdrop = document.querySelector('.backdrop');
const modalMenuCloseBtn = document.querySelector('.close-modal-menu-btn');
const countPlusBtn = document.querySelector('.modal-count-plus-btn');
const countMinusBtn = document.querySelector('.modal-count-minus-btn');
const itemsCounter = document.querySelector('.counter');

let favStorage = localStorage.getItem('fav');
let favArray = JSON.parse(favStorage);
let addToCartBtn = document.querySelector('.modal-menu-add-button');
let counter = 1;

mobileMenu.addMobileMenuListener();

const favButton = document.querySelector('.fav-button');
const profileButton = document.querySelector('.profile-button');

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

cartCount();

favButton.addEventListener('click', event => {
  window.location.href = './favourite.html';
});

profileButton.addEventListener('click', event => {
  window.location.href = './profile.html';
});

mobileMenu.addMobileMenuListener();

function countInCartItems() {
  const orderStorage = localStorage.getItem('order');
  let orderArray = JSON.parse(orderStorage);
  console.log(orderArray);
  // Перевірка на наявність масиву
  if (orderArray) {
    cartCounter.textContent = orderArray.length;
    cartCounterMobile.textContent = orderArray.length;
  } else {
    cartCounter.textContent = '0'; // Якщо масив порожній
    cartCounterMobile.textContent = '0';
  }
}

function getItemById(itemId) {
  const itemFromPizza = pizza.find(item => item.id === parseInt(itemId));
  const itemFromBurgers = burgers.find(item => item.id === parseInt(itemId));
  const itemFromPita = pita.find(item => item.id === parseInt(itemId));
  if (itemFromPizza) return itemFromPizza;
  if (itemFromBurgers) return itemFromBurgers;
  if (itemFromPita) return itemFromPita;
}

// Функція для додавання обробників подій для кнопок лайк
function addLikeEventListeners() {
  let menuLikeButtons = document.querySelectorAll('.menu-like-btn');
  menuLikeButtons.forEach(button => {
    button.addEventListener('click', handleLikeButtonClick);
  });
}

// Функція для видалення обробників подій для кнопок лайк
function removeLikeEventListeners() {
  let menuLikeButtons = document.querySelectorAll('.menu-like-btn');
  menuLikeButtons.forEach(button => {
    button.removeEventListener('click', handleLikeButtonClick);
  });
}

// Обробник події для кнопок лайк
function handleLikeButtonClick(event) {
  const itemId = event.currentTarget.getAttribute('data-info');
  if (!localStorage.getItem('fav')) {
    let favArray = [];
    let favJSON = JSON.stringify(favArray);
    localStorage.setItem('fav', favJSON);
  }
  if (localStorage.getItem('fav')) {
    let favLocal = localStorage.getItem('fav');
    let favArray = JSON.parse(favLocal);
    let existingItemIndex = favArray.findIndex(item => item === itemId);
    if (existingItemIndex === -1) {
      favArray.push(itemId);
    } else {
      favArray.splice(existingItemIndex, 1);
    }
    let updatedFavJSON = JSON.stringify(favArray);

    localStorage.setItem('fav', updatedFavJSON);
  }
  location.reload();
}

function displayItemModal(itemId) {
  const item = getItemById(itemId);
  const modalContent = document.querySelector('.modal-content');
  let addToCartBtn = document.querySelector('.modal-menu-add-button');
  addToCartBtn.dataset.info = `${item.id}`;
  // Отримання об'єкта з відповідним id

  // Відображення інформації про об'єкт у модальному вікні

  const markup = `
      <picture class="modal-menu-img">
        <source
           srcset="
                ${item.imgDesktop} 1x,
                ${item.imgDesktop2x} 2x
              "
          media="(min-width:1158px)"
          height="300"
          width="360"
        />
     
        <source
          srcset="${item.imgMobile2x} 2x"
          media="(max-width: 767px)"
          width="200"
          height="200"
        />
        <img class="modal-menu-img"src="${item.imgMobile}" alt="pizza" width="200" height="200">
      </picture>
      <h2 class="modal-menu-header">${item.name}</h2>
      <p class="modal-menu-price">${item.price} грн</p>
      <p class="modal-menu-describe">Шинка, маслини, шампіньйони, помідори, сир Моцарела, соус бешамель</p>  
      
  `;

  modalContent.innerHTML = '';
  modalContent.insertAdjacentHTML('afterbegin', markup);
}

function togleMobileMenu(obj) {
  obj.classList.toggle('is-open');
}

cartButton.addEventListener('click', event => {
  window.location.href = './cart.html';
});

cartPcButton.addEventListener('click', event => {
  window.location.href = './cart.html';
});

modalMenuCloseBtn.addEventListener('click', event => {
  togleMobileMenu(backdrop);
  document.body.style.overflow = 'auto';
  counter = 1;
  itemsCounter.innerHTML = counter;
});

addToCartBtn.addEventListener('click', event => {
  let itemId = addToCartBtn.getAttribute('data-info');
  let itemObj = { itemId: itemId, count: 1 }; // Початкове значення count - 1
  const orderStorage = localStorage.getItem('order');
  let orderArray = JSON.parse(orderStorage) || []; // Якщо localStorage порожній, створюємо порожній масив
  itemObj.count = counter;
  itemObj.itemId = `${itemId}`;

  // Перевірка, чи вже існує товар з таким itemId в замовленні
  let existingItemIndex = orderArray.findIndex(item => item.itemId === itemId);

  if (existingItemIndex !== -1) {
    // Якщо товар існує, збільшуємо кількість
    orderArray[existingItemIndex].count += counter;
  } else {
    // Якщо товару немає в замовленні, додаємо його
    orderArray.push(itemObj);
  }

  let updatedOrderJSON = JSON.stringify(orderArray);
  localStorage.setItem('order', updatedOrderJSON);

  // Додаткові дії, які ви виконуєте після додавання товару в кошик
  togleMobileMenu(backdrop);
  countInCartItems();
  counter = 1;
  itemsCounter.innerHTML = counter;
  document.body.style.overflow = 'auto';
});

countPlusBtn.addEventListener('click', event => {
  itemsCounter.innerHTML = '';
  counter += 1;
  itemsCounter.innerHTML = counter;
});

countMinusBtn.addEventListener('click', event => {
  if (counter > 1) {
    counter -= 1;
    itemsCounter.innerHTML = counter;
  }
});

document.addEventListener('DOMContentLoaded', event => {
  menu.innerHTML = '';
  favArray.forEach((item, index) => {
    // Додали параметр index
    let itemId = item;
    const menuArray = getItemById(itemId);
    const markup = `<li class="menu-list-item">
    <div class="menu-list-item-container">
      
      <div class="svg-like-container">
      <button class="menu-like-btn is-active" type="button" data-info="${menuArray.id}"><svg
    class="like-icon"
    aria-label="like-icon"
    width="24"
    height="24"
    >
    <use href="../svg/symbol-defs.svg#icon-heart-outline"></use>
    </svg></button>
  </div>
    <picture>
      <source
        srcset="
          ${menuArray.imgDesktop} 1x,
          ${menuArray.imgDesktop2x} 2x
        "
        media="(min-width:1158px)"
        height="300"
        width="360"
      />
   
      <source
        srcset="${menuArray.imgMobile2x} 2x"
        media="(max-width: 767px)"
      />
      <img class="menu-img" src="${menuArray.imgMobile}" alt="pizza">
    </picture>
    <div class="list-item-textcontent-container">
    <h3 class="menu-list-item-header">${menuArray.name}</h3>
    <p class="menu-list-item-price">${menuArray.price} грн</p>
    </div>
    <button class="menu-list-item-add-button" type="button" data-info="${menuArray.id}">Додати</button>
    </div>
  </li>`;

    menu.insertAdjacentHTML('beforeend', markup);

    removeLikeEventListeners();
    addLikeEventListeners();
  });
});

document.addEventListener('DOMContentLoaded', event => {
  countInCartItems();
  let menuAddItemButtons = document.querySelectorAll(
    '.menu-list-item-add-button'
  );
  menuAddItemButtons = document.querySelectorAll('.menu-list-item-add-button');
  menuAddItemButtons.forEach(button => {
    button.addEventListener('click', event => {
      const itemId = button.getAttribute('data-info');
      displayItemModal(itemId);
      togleMobileMenu(backdrop);
      document.body.style.overflow = 'hidden';
    });
  });
});
