"use strict"


const mobileMenuOpenBtn = document.querySelector(".mobile-menu-open-button");
const mobileMenuCloseBtn = document.querySelector(".close-mobile-menu-btn");
const categoryMenuPizzaBtn = document.querySelector(".category-pizza-btn");
const categoryMenuBurgerBtn = document.querySelector(".category-burger-btn");
const categoryMenuPitaBtn = document.querySelector(".category-pita-btn");
const categoryMenuUl = document.querySelector(".menu-category-ul");
const menuHeader = document.querySelector(".menu-header");
const menu = document.querySelector(".menu-list");

const pizza = [
    {
        name: "Піца з грушею та сиром Дорблю",
        imgMobile : "../img/mobile/pizza.png",
        imgMobile2x : "../img/mobile/pizza@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "165"
    },
    {
        name: "Піца з грушею та сиром Дорблю",
        imgMobile : "../img/mobile/pizza.png",
        imgMobile2x : "../img/mobile/pizza@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "165"
    },
    {
        name: "Піца з грушею та сиром Дорблю",
        imgMobile : "../img/mobile/pizza.png",
        imgMobile2x : "../img/mobile/pizza@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "165"
    },
    {
        name: "Піца з грушею та сиром Дорблю",
        imgMobile : "../img/mobile/pizza.png",
        imgMobile2x : "../img/mobile/pizza@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "165"
    }
];

const burgers = [
    {
        name: "Бургер з яловичиною",
        imgMobile : "../img/mobile/burger.png",
        imgMobile2x : "../img/mobile/burger@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "200"
    },
    {
        name: "Бургер з яловичиною",
        imgMobile : "../img/mobile/burger.png",
        imgMobile2x : "../img/mobile/burger@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "200"
    },
    {
        name: "Бургер з яловичиною",
        imgMobile : "../img/mobile/burger.png",
        imgMobile2x : "../img/mobile/burger@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "200"
    },
    {
        name: "Бургер з яловичиною",
        imgMobile : "../img/mobile/burger.png",
        imgMobile2x : "../img/mobile/burger@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "200"
    }
];

const pita = [
    {
        name: "Піта з яловичиною",
        imgMobile : "../img/mobile/pita.png",
        imgMobile2x : "../img/mobile/pita@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "85"
    },
    {
        name: "Піта з яловичиною",
        imgMobile : "../img/mobile/pita.png",
        imgMobile2x : "../img/mobile/pita@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "85"
    },
    {
        name: "Піта з яловичиною",
        imgMobile : "../img/mobile/pita.png",
        imgMobile2x : "../img/mobile/pita@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "85"
    },
    {
        name: "Піта з яловичиною",
        imgMobile : "../img/mobile/pita.png",
        imgMobile2x : "../img/mobile/pita@2x.png",
        imgDesktop : "../img/desktop/grusha.png",
        imgDesktop2x : "../img/desktop/grusha@2x.png",
        price: "85"
    }
];



function togleMobileMenu (){
    const mobileMenu = document.querySelector(".modal-mobile-menu");
    mobileMenu.classList.toggle("is-open");
    document.body.style.overflow = "hidden"; 
}

function togleActiveButton(btn) {
    if (categoryMenuPizzaBtn.classList.contains("is-active")) {
        categoryMenuPizzaBtn.classList.toggle("is-active");
    }
    if (categoryMenuBurgerBtn.classList.contains("is-active")) {
        categoryMenuBurgerBtn.classList.toggle("is-active");
    }
    if (categoryMenuPitaBtn.classList.contains("is-active")) {
        categoryMenuPitaBtn.classList.toggle("is-active");
    }
    btn.classList.toggle("is-active");
}

function changeCategoryMenu(btn){
    menu.innerHTML = "";
    if (categoryMenuPizzaBtn.classList.contains("is-active")){
        menuHeader.textContent = "Уся піца";
        pizza.forEach(item => {
            const markup = `<li class="menu-list-item">
        <div class="menu-list-item-container">
          
          <div class="svg-like-container">
          <button class="menu-like-btn" type="button"><svg
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
          />
          <img class="menu-img" src="${item.imgMobile}" alt="pizza">
        </picture>
        <h3 class="menu-list-item-header">${item.name}</h3>
        <p class="menu-list-item-price">${item.price} грн</p>
        <button class="menu-list-item-add-button" type="button">Додати</button>
        </div>
      </li>`
      
      menu.insertAdjacentHTML("beforeend", markup);
        })
    }
    if (categoryMenuBurgerBtn.classList.contains("is-active")){
        menuHeader.textContent = "Усі бургери";
        burgers.forEach(item => {
            const markup = `<li class="menu-list-item">
        <div class="menu-list-item-container">
          
          <div class="svg-like-container">
          <button class="menu-like-btn" type="button"><svg
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
          />
          <img class="menu-img" src="${item.imgMobile}" alt="pizza">
        </picture>
        <h3 class="menu-list-item-header">${item.name}</h3>
        <p class="menu-list-item-price">${item.price} грн</p>
        <button class="menu-list-item-add-button" type="button">Додати</button>
        </div>
      </li>`
      
      menu.insertAdjacentHTML("beforeend", markup);
        })

    }
    if (categoryMenuPitaBtn.classList.contains("is-active")){
        menuHeader.textContent = "Уся піта";
        pita.forEach(item => {
            const markup = `<li class="menu-list-item">
        <div class="menu-list-item-container">
          
          <div class="svg-like-container">
          <button class="menu-like-btn" type="button"><svg
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
          />
          <img class="menu-img" src="${item.imgMobile}" alt="pizza">
        </picture>
        <h3 class="menu-list-item-header">${item.name}</h3>
        <p class="menu-list-item-price">${item.price} грн</p>
        <button class="menu-list-item-add-button" type="button">Додати</button>
        </div>
      </li>`
      
      menu.insertAdjacentHTML("beforeend", markup);
        })

    }
}


mobileMenuOpenBtn.addEventListener("click", togleMobileMenu);
mobileMenuCloseBtn.addEventListener("click",(event) =>{
    togleMobileMenu();
    document.body.style.overflow = "auto";
});

categoryMenuUl.addEventListener("click" , (event) =>{
    const btn = event.target;
    togleActiveButton(btn);
    changeCategoryMenu(btn);
})