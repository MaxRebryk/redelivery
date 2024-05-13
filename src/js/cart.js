'use strict';

import * as mobileMenu from '../js/mobile-menu.js';
import { pizza, burgers, pita } from '../js/menu-list.js';

const tipsButtonsUl = document.querySelector('.tips-button-ul');
const renderContainer = document.querySelector('.render-item-container');
const cleanOrderBtn = document.querySelector('.clean-btn');
const mediumTipsBtn = document.querySelector('.tips-ten-button');
const maxTipsBtn = document.querySelector('.tips-fifteen-button');
const fullPrice = document.querySelector('.full-price');
const tipsPrice = document.querySelector('.tips-price');
const dishesPrice = document.querySelector('.dishes-price');
const backMenuBtn = document.querySelector('.back-menu-btn');
const deliveryForm = document.querySelector('.delivery-form');
const DeliveryWay = document.querySelector('.delivery-way-class');
const streetInput = document.querySelector('#street');
const buildingInput = document.querySelector('#building');
const floorInput = document.querySelector('#floor');
const apartmentInput = document.querySelector('#apartment');
const addressCommentInput = document.querySelector('#address-comment');
const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
const payWay = document.querySelector('#pay-way');
const orderCommentInput = document.querySelector('#order-comment');
const secondNameInput = document.querySelector('#second-name');
const emailInput = document.querySelector('#email');
const backdrop = document.querySelector('.backdrop');
const loginRedirectBtn = document.querySelector('.login-redirect-btn');
const closeModalBtn = document.querySelector('.close-modal-menu-btn');

let orderStorage = localStorage.getItem('order');
let orderArray = JSON.parse(orderStorage);

let totalOrderPrice = 0;
let tips = 0;

mobileMenu.addMobileMenuListener();

function calculatePrice() {
  tips = 0;
  if (mediumTipsBtn.classList.contains('is-active')) {
    tips = (totalOrderPrice * 10) / 100;
    tipsPrice.textContent = `${tips} грн`;
  }
  if (maxTipsBtn.classList.contains('is-active')) {
    tips = (totalOrderPrice * 15) / 100;
    tipsPrice.textContent = `${tips} грн`;
  }
  dishesPrice.textContent = `${totalOrderPrice} грн`;
  tipsPrice.textContent = `${tips} грн`;
  fullPrice.textContent = totalOrderPrice + tips + 50 + ' грн';
}

function updatePrices() {
  // Перераховуємо вартість всіх страв

  let totalDishesPrice = 0;
  orderArray.forEach(item => {
    const menuItem = getItemById(item.itemId);
    totalDishesPrice += menuItem.price * item.count;
  });
  dishesPrice.textContent = `${totalDishesPrice} грн`;
  tips = 0;
  if (mediumTipsBtn.classList.contains('is-active')) {
    tips = (totalDishesPrice * 10) / 100;
    tipsPrice.textContent = `${tips} грн`;
  }
  if (maxTipsBtn.classList.contains('is-active')) {
    tips = (totalDishesPrice * 15) / 100;
    tipsPrice.textContent = `${tips} грн`;
  }
  tipsPrice.textContent = `${tips} грн`;
  // Перераховуємо повну вартість замовлення з урахуванням tips
  const totalFullPrice = totalDishesPrice + tips + 50; // Додаємо 50 грн за доставку
  fullPrice.textContent = `${totalFullPrice} грн`;
}

function toggleActiveButton(btn) {
  const buttons = tipsButtonsUl.querySelectorAll('button');
  buttons.forEach(button => {
    if (button.classList.contains('is-active')) {
      button.classList.remove('is-active');
    }
  });
  btn.classList.add('is-active');
}

function getItemById(itemId) {
  const itemFromPizza = pizza.find(item => item.id === parseInt(itemId));
  const itemFromBurgers = burgers.find(item => item.id === parseInt(itemId));
  const itemFromPita = pita.find(item => item.id === parseInt(itemId));
  if (itemFromPizza) return itemFromPizza;
  if (itemFromBurgers) return itemFromBurgers;
  if (itemFromPita) return itemFromPita;
}

document.addEventListener('DOMContentLoaded', event => {
  orderArray.forEach((item, index) => {
    let itemId = item.itemId;
    const menuArray = getItemById(itemId);
    let counter = item.count;
    totalOrderPrice += menuArray.price * counter;
    const markup = `<div class="item-container" id="item-${index}">
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
                width="83"
                height="83"
                />
                <img class="item-img" src="${
                  menuArray.imgMobile
                }" alt="pizza" width="83" height="83">
            </picture>

            <div class="item-info-container">

            <h3 class="item-header">${menuArray.name}</h3>
            
        
            <div class="item-count-container">
                <button class="item-count-minus-btn" type="button" data-info="${
                  menuArray.id
                }">-</button>
                <p class="counter">${counter}</p>
                <button class="item-count-plus-btn" type="button" data-info="${
                  menuArray.id
                }">+</button>
            </div>
            <p class="item-price">${menuArray.price * counter} грн</p>
            </div>
        </div>`;

    renderContainer.insertAdjacentHTML('beforeend', markup);
  });

  calculatePrice();

  const countPlusBtns = document.querySelectorAll('.item-count-plus-btn');
  const countMinusBtns = document.querySelectorAll('.item-count-minus-btn');
  const itemsCounters = document.querySelectorAll('.counter');
  const itemPrices = document.querySelectorAll('.item-price');
  let counters = Array.from({ length: countPlusBtns.length }, () => 1);

  for (let i = 0; i < countPlusBtns.length; i++) {
    countPlusBtns[i].addEventListener('click', event => {
      const dataId = countPlusBtns[i].getAttribute('data-info');

      let orderStorage = localStorage.getItem('order');
      orderArray = JSON.parse(orderStorage);
      orderArray.forEach((item, index) => {
        if (item.itemId === dataId) {
          item.count += 1;
          itemsCounters[i].innerHTML = item.count;
          counters[i] = item.count;
          let itemFromMenuList = getItemById(item.itemId);
          totalOrderPrice = itemFromMenuList.price * item.count;
          let updatedPrice = itemFromMenuList.price * item.count;
          itemPrices[i].textContent = `${updatedPrice} грн`;
        }
      });
      let updatedOrderJSON = JSON.stringify(orderArray);
      localStorage.setItem('order', updatedOrderJSON);
      calculatePrice();
      updatePrices();
    });

    countMinusBtns[i].addEventListener('click', event => {
      if (counters[i] > 1) {
        const dataId = countMinusBtns[i].getAttribute('data-info');
        let orderStorage = localStorage.getItem('order');
        orderArray = JSON.parse(orderStorage);
        orderArray.forEach((item, index) => {
          if (item.itemId === dataId) {
            item.count -= 1;
            itemsCounters[i].innerHTML = item.count;
            counters[i] = item.count;
            let itemFromMenuList = getItemById(item.itemId);
            totalOrderPrice = itemFromMenuList.price * item.count;
            let updatedPrice = itemFromMenuList.price * item.count;
            itemPrices[i].textContent = `${updatedPrice} грн`;
          }
        });
        let updatedOrderJSON = JSON.stringify(orderArray);
        localStorage.setItem('order', updatedOrderJSON);
        calculatePrice();
        updatePrices();
      }
    });
  }
});

tipsButtonsUl.addEventListener('click', event => {
  const targetButton = event.target;
  if (targetButton.tagName === 'BUTTON') {
    toggleActiveButton(targetButton);

    calculatePrice();
    updatePrices();
  }
});

cleanOrderBtn.addEventListener('click', event => {
  localStorage.removeItem('order');
  let order = [];
  let orderJSON = JSON.stringify(order);
  localStorage.setItem('order', orderJSON);

  renderContainer.innerHTML = '';
  tipsPrice.textContent = `0 грн`;
  fullPrice.textContent = `0 грн`;
  dishesPrice.textContent = `0 грн`;
});

backMenuBtn.addEventListener('click', event => {
  history.back();
});

deliveryForm.addEventListener('submit', event => {
  event.preventDefault();
  let deliveryInfo = {};

  deliveryInfo.deliveryWay = DeliveryWay.value;
  deliveryInfo.street = streetInput.value;
  deliveryInfo.building = buildingInput.value;
  deliveryInfo.floor = floorInput.value;
  deliveryInfo.apartment = apartmentInput.value;
  deliveryInfo.addressComment = addressCommentInput.value;
  deliveryInfo.name = nameInput.value;
  deliveryInfo.secondName = secondNameInput.value;
  deliveryInfo.email = emailInput.value;
  deliveryInfo.phone = phoneInput.value;
  deliveryInfo.payWay = payWay.value;
  deliveryInfo.orderComment = orderCommentInput.value;
  deliveryInfo.tips = tips;
  let deliveryInfoJSON = JSON.stringify(deliveryInfo);
  localStorage.setItem('deliveryInfo', deliveryInfoJSON);

  let confirmedOrder = localStorage.getItem('order');
  let confirmedOrderArray = JSON.parse(confirmedOrder);

  let confirmedOrderJSON = JSON.stringify(confirmedOrderArray);
  localStorage.setItem('confirmedOrder', confirmedOrderJSON);
  if (localStorage.getItem('orderHistory') !== 'true') {
    let orderHistoryArray =
      JSON.parse(localStorage.getItem('orderHistory')) || []; // Отримання попередньої історії замовлень
    orderHistoryArray.push(orderArray); // Додавання нового замовлення до історії
    localStorage.setItem('orderHistory', JSON.stringify(orderHistoryArray)); // Збереження оновленої історії замовлень
  }
  localStorage.removeItem('order');
  let order = [];
  let orderJSON = JSON.stringify(order);
  localStorage.setItem('order', orderJSON);

  backdrop.classList.add('is-open');
});

loginRedirectBtn.addEventListener('click', event => {
  window.location.href = './login.html';
});

closeModalBtn.addEventListener('click', event => {
  window.location.href = './menu.html';
});
