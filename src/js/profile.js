'use strict';

import * as mobileMenu from '../js/mobile-menu.js';
import { pizza, burgers, pita } from '../js/menu-list.js';

const renderList = document.querySelector('.current-order-items-list');
const dishesPrice = document.getElementById('dishes-price');
const fullPrice = document.getElementById('full-price');
const tipsPrice = document.getElementById('tips-price');
let orderStorage = localStorage.getItem('confirmedOrder');
let orderArray = JSON.parse(orderStorage);

let totalOrderPrice = 0;
let tips = 0;

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
                " media="(min-width:1158px)" height="300" width="360" />

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
