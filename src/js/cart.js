"use strict";

import * as mobileMenu from './mobile-menu';
import { pizza, burgers, pita } from './menu-list.js';



const tipsButtonsUl = document.querySelector(".tips-button-ul");
const renderContainer = document.querySelector(".render-item-container");
const cleanOrderBtn = document.querySelector(".clean-btn")
const minTipsBtn = document.querySelector(".tips-zero-button");
const mediumTipsBtn = document.querySelector(".tips-ten-button");
const maxTipsBtn = document.querySelector(".tips-fifteen-button");
const fullPrice = document.querySelector(".full-price");
const tipsPrice = document.querySelector(".tips-price");
const dishesPrice = document.querySelector(".dishes-price");
let totalOrderPrice = 0;
  





mobileMenu.addMobileMenuListener();





function calculatePrice() {
    let tips = 0;
    if (mediumTipsBtn.classList.contains("is-active")) {
        tips = (totalOrderPrice * 10) / 100;
        tipsPrice.textContent = `${tips} грн`

    }
    if (maxTipsBtn.classList.contains("is-active")) {
        tips = (totalOrderPrice * 15) / 100;
        tipsPrice.textContent = `${tips} грн`
    }
    tipsPrice.textContent = `${tips} грн`
    fullPrice.textContent = totalOrderPrice + tips + 50 + " грн";
}


 
function toggleActiveButton(btn) {
    const buttons = tipsButtonsUl.querySelectorAll("button");
    buttons.forEach(button => {
        if (button.classList.contains("is-active")) {
            button.classList.remove("is-active");
        }
    });
    btn.classList.add("is-active");
}

function getItemById(itemId) {
    const itemFromPizza = pizza.find(item => item.id === parseInt(itemId));
    const itemFromBurgers = burgers.find(item => item.id === parseInt(itemId));
    const itemFromPita = pita.find(item => item.id === parseInt(itemId));
    if (itemFromPizza) return itemFromPizza;
    if (itemFromBurgers) return itemFromBurgers;
    if (itemFromPita) return itemFromPita;
  };


  document.addEventListener("DOMContentLoaded", (event) => {
    const orderStorage = localStorage.getItem('order');
    const orderArray = JSON.parse(orderStorage);
    
    console.log(orderArray);
    orderArray.forEach((item, index) => { // Додали параметр index
        let itemId = item.itemId;
        const menuArray = getItemById(itemId);
        let counter = item.count;
        totalOrderPrice += menuArray.price*counter
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
                <img class="item-img" src="${menuArray.imgMobile}" alt="pizza" width="83" height="83">
            </picture>

            <div class="item-info-container">

            <h3 class="item-header">${menuArray.name}</h3>
            
        
            <div class="item-count-container">
                <button class="item-count-minus-btn" type="button">-</button>
                <p class="counter">${counter}</p>
                <button class="item-count-plus-btn" type="button">+</button>
            </div>
            <p class="item-price">${menuArray.price*counter} грн</p>
            </div>
        </div>`

        renderContainer.insertAdjacentHTML("beforeend", markup);
    });

    const countPlusBtns = document.querySelectorAll(".item-count-plus-btn");
    const countMinusBtns = document.querySelectorAll(".item-count-minus-btn");
    const itemsCounters = document.querySelectorAll(".counter");
    let counters = Array.from({ length: countPlusBtns.length }, () => 1);
    

    for (let i = 0; i < countPlusBtns.length; i++) {
        countPlusBtns[i].addEventListener("click", (event) => {
        counters[i]++;
        itemsCounters[i].innerHTML = counters[i];
        });
    
        countMinusBtns[i].addEventListener("click", (event) => {
        if (counters[i] > 1) {
            counters[i]--;
            itemsCounters[i].innerHTML = counters[i];
        }
        });
    };

    calculatePrice();

    
    dishesPrice.textContent = `${totalOrderPrice} грн`;



    
    
    

    
});



tipsButtonsUl.addEventListener("click", (event) => {
    const targetButton = event.target;
    if (targetButton.tagName === "BUTTON") {
        toggleActiveButton(targetButton);

        calculatePrice();
    }
  


    fullPrice.textContent = totalOrderPrice + 50 + tips + " грн";
  });


cleanOrderBtn.addEventListener("click", (event) =>{
    localStorage.removeItem("order");
    renderContainer.innerHTML="";
    tipsPrice.textContent = `0 грн`
    fullPrice.textContent = `0 грн`
    dishesPrice.textContent = `0 грн`;
})

  