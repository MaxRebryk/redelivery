'use strict';

import * as mobileMenu from '../js/mobile-menu.js';
import { pizza, burgers, pita } from '../js/menu-list.js';

const renderList = document.querySelector('.current-order-items-list');
const historyRenderList = document.querySelector('.history-items-list');
const dishesPrice = document.getElementById('dishes-price');
const fullPrice = document.getElementById('full-price');
const tipsPrice = document.getElementById('tips-price');
const favButton = document.querySelector('.fav-button');
const profileButton = document.querySelector('.profile-button');
const cartButton = document.querySelector('.cart-button');
let deliveryInfo = localStorage.getItem('deliveryInfo');
let deliveryInfoArray = JSON.parse(deliveryInfo);
let orderStorage = localStorage.getItem('confirmedOrder');
let orderArray = JSON.parse(orderStorage);

let totalOrderPrice = 0;
let tips = deliveryInfoArray.tips;

cartButton.addEventListener('click', event => {
  window.location.href = './menu.html';
});

favButton.addEventListener('click', event => {
  window.location.href = './favourite.html';
});

profileButton.addEventListener('click', event => {
  window.location.href = './profile.html';
});

function areLogin() {
  // Перевіряємо, чи є користувач увійшов без очікування DOMContentLoaded
  const userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
  if (userLoggedIn) {
    return true;
  } else {
    window.location.href = './login.html';
  }
  console.log(userLoggedIn);
  // Повертаємо true, якщо користувач увійшов, false в іншому випадку
}

areLogin();

function getItemById(itemId) {
  const itemFromPizza = pizza.find(item => item.id === parseInt(itemId));
  const itemFromBurgers = burgers.find(item => item.id === parseInt(itemId));
  const itemFromPita = pita.find(item => item.id === parseInt(itemId));
  if (itemFromPizza) return itemFromPizza;
  if (itemFromBurgers) return itemFromBurgers;
  if (itemFromPita) return itemFromPita;
}

mobileMenu.addMobileMenuListener();

document.addEventListener('DOMContentLoaded', event => {
  renderList.textContent = '';
  orderArray.forEach((item, index) => {
    let itemId = item.itemId;
    const menuArray = getItemById(itemId);
    let counter = item.count;
    totalOrderPrice += menuArray.price * counter;
    const markup = ` <li class="current-order-item">
    <div class="item-container" id="item-${index}">
        <div class="item-picture-container">
            <picture>
                <source srcset="
                ${menuArray.imgDesktop} 1x,
                ${menuArray.imgDesktop2x} 2x
                " media="(min-width:1158px)" height="80" width="80" />

                <source srcset="${
                  menuArray.imgMobile2x
                } 2x" media="(max-width: 767px)" width="83"
                    height="84" />
                <img class="menu-img" src="${
                  menuArray.imgMobile
                }" alt="pizza" width="83"
                    height="84">
            </picture>
        </div>

        <div class="item-info-container">

            <h3 class="item-header">${menuArray.name}</h3>


            <div class="item-count-container">
             
                <p class="counter">${counter} x</p>
             
            </div>
            <p class="item-price">${menuArray.price * counter} грн</p>
        </div>
    </div>
</li>`;

    renderList.insertAdjacentHTML('beforeend', markup);
  });
  dishesPrice.textContent = `${totalOrderPrice} грн`;
  tipsPrice.textContent = `${tips} грн`;
  fullPrice.textContent = totalOrderPrice + tips + 50 + ' грн';
});

document.addEventListener('DOMContentLoaded', event => {
  historyRenderList.textContent = '';
  let orderHistoryArray = JSON.parse(localStorage.getItem('orderHistory'));

  orderHistoryArray.forEach((order, index) => {
    let markupArray = order.map(item => {
      let itemId = item.itemId;
      const menuHistoryArray = getItemById(itemId);
      let counter = item.count;
      return `  <li class="history-orders-items">
        <div class="item-picture-container">
          <picture>
            <source srcset="
              ${menuHistoryArray.imgDesktop} 1x,
              ${menuHistoryArray.imgDesktop2x} 2x
            " media="(min-width:1158px)" height="80" width="80" />

            <source srcset="${
              menuHistoryArray.imgMobile2x
            } 2x" media="(max-width: 767px)" width="83" height="84" />
            <img class="menu-img" src="${
              menuHistoryArray.imgMobile
            }" alt="pizza" width="83" height="84">
          </picture>
          </div>
          <div class="history-item-info-container">
            <h3 class="item-header">${counter}x ${menuHistoryArray.name}</h3>
            <p class="item-price">${menuHistoryArray.price * counter} грн</p>
          </div>
        </div>
      </li>`;
    });
    historyRenderList.insertAdjacentHTML('afterbegin', markupArray.join(''));
  });
});
