"use strict"

import { pizza, burgers, pita } from './menu-list.js';
import * as mobileMenu from "../js/mobile-menu.js"


const categoryMenuPizzaBtn = document.querySelector(".category-pizza-btn");
const categoryMenuBurgerBtn = document.querySelector(".category-burger-btn");
const categoryMenuPitaBtn = document.querySelector(".category-pita-btn");
const categoryMenuUl = document.querySelector(".menu-category-ul");
const menuHeader = document.querySelector(".menu-header");
const menu = document.querySelector(".menu-list");
const modalMenuCloseBtn = document.querySelector(".close-modal-menu-btn");
const backdrop = document.querySelector(".backdrop");
const searchInput = document.querySelector(".search-input");
const cartButton = document.querySelector(".cart-container");


if (!localStorage.getItem("fav")){
  let favArray = [];
  let favJSON = JSON.stringify(favArray);
  localStorage.setItem('fav', favJSON);
}

let addToCartBtn = document.querySelector(".modal-menu-add-button");
let menuAddItemButtons = document.querySelectorAll(".menu-list-item-add-button");
let counter = 1;
if (!localStorage.getItem("order")){
  let order = [];
  let orderJSON = JSON.stringify(order);
  localStorage.setItem('order', orderJSON);
}

mobileMenu.addMobileMenuListener();


export default function togleLikeButton (){
  let menuLikeButtons = document.querySelectorAll(".menu-like-btn");
  menuLikeButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.currentTarget.classList.toggle("is-active");
    })
    let itemId = button.getAttribute("data-info");
    let favLocal = localStorage.getItem("fav");
    let favArray = JSON.parse(favLocal);
    let existingItemIndex = favArray.findIndex(item => item === itemId);
    if (existingItemIndex === -1) {
       
    } else {
        button.classList.toggle("is-active");
    }



  });
}

// Функція для додавання обробників подій для кнопок лайк
function addLikeEventListeners() {
  let menuLikeButtons = document.querySelectorAll(".menu-like-btn");
  menuLikeButtons.forEach(button => {
      button.addEventListener("click", handleLikeButtonClick);
     
  });
}

// Функція для видалення обробників подій для кнопок лайк
function removeLikeEventListeners() {
  let menuLikeButtons = document.querySelectorAll(".menu-like-btn");
  menuLikeButtons.forEach(button => {
      button.removeEventListener("click", handleLikeButtonClick);
  });
}

// Обробник події для кнопок лайк
function handleLikeButtonClick(event) {
  const itemId = event.currentTarget.getAttribute("data-info");
  if (!localStorage.getItem("fav")){
    let favArray = [];
    let favJSON = JSON.stringify(favArray);
    localStorage.setItem('fav', favJSON);
  }
  if (localStorage.getItem("fav")){
    
    let favLocal = localStorage.getItem("fav");
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
  
}





function togleMobileMenu (obj){
    obj.classList.toggle("is-open");
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
          <button class="menu-like-btn" type="button" data-info="${item.id}"><svg
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
        <div class="list-item-textcontent-container">
        <h3 class="menu-list-item-header">${item.name}</h3>
        <p class="menu-list-item-price">${item.price} грн</p>
        </div>
        <button class="menu-list-item-add-button" type="button" data-info="${item.id}">Додати</button>
        </div>
      </li>`
      
      menu.insertAdjacentHTML("beforeend", markup);
      if(item.new){
        const menuListItemContainer = document.querySelector(".menu-list-item-container");
        const newMarkup = `<span class="menu-new">New</span>`
        menuListItemContainer.insertAdjacentHTML("afterbegin", newMarkup);
      }
        })
    }
    if (categoryMenuBurgerBtn.classList.contains("is-active")){
        menuHeader.textContent = "Усі бургери";
        burgers.forEach(item => {
            const markup = `<li class="menu-list-item">
        <div class="menu-list-item-container">
          
          <div class="svg-like-container">
          <button class="menu-like-btn" type="button" data-info="${item.id}"><svg
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
        <div class="list-item-textcontent-container">
        <h3 class="menu-list-item-header">${item.name}</h3>
        <p class="menu-list-item-price">${item.price} грн</p>
        </div>
        <button class="menu-list-item-add-button" type="button" data-info="${item.id}">Додати</button>
        </div>
      </li>`
      
      menu.insertAdjacentHTML("beforeend", markup);
      if(item.new){
        const menuListItemContainer = document.querySelector(".menu-list-item-container");
        const newMarkup = `<span class="menu-new">New</span>`
        menuListItemContainer.insertAdjacentHTML("afterbegin", newMarkup);
      }
  
        })

    }
    if (categoryMenuPitaBtn.classList.contains("is-active")){
        menuHeader.textContent = "Уся піта";
        pita.forEach(item => {
            const markup = `<li class="menu-list-item">
        <div class="menu-list-item-container">
          
          <div class="svg-like-container">
          <button class="menu-like-btn" type="button" data-info="${item.id}"><svg
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
        <div class="list-item-textcontent-container">
        <h3 class="menu-list-item-header">${item.name}</h3>
        <p class="menu-list-item-price">${item.price} грн</p>
        </div>
        <button class="menu-list-item-add-button" type="button" data-info="${item.id}">Додати</button>
        </div>
      </li>`
      
      menu.insertAdjacentHTML("beforeend", markup);
      if(item.new){
        const menuListItemContainer = document.querySelector(".menu-list-item-container");
        const newMarkup = `<span class="menu-new">New</span>`
        menuListItemContainer.insertAdjacentHTML("afterbegin", newMarkup);
      }
        })

    }
   
}

function getItemById(itemId) {
  const itemFromPizza = pizza.find(item => item.id === parseInt(itemId));
  const itemFromBurgers = burgers.find(item => item.id === parseInt(itemId));
  const itemFromPita = pita.find(item => item.id === parseInt(itemId));
  if (itemFromPizza) return itemFromPizza;
  if (itemFromBurgers) return itemFromBurgers;
  if (itemFromPita) return itemFromPita;
};

function displayItemModal(itemId) {
  const item = getItemById(itemId);
  const modalContent = document.querySelector(".modal-content");
  addToCartBtn = document.querySelector(".modal-menu-add-button");
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



modalContent.innerHTML="";
modalContent.insertAdjacentHTML("afterbegin", markup);


}

function findItemByText(text) {
  const textLowerCase = text.toLowerCase();
  const matchingItems = [];
  
  pizza.forEach(item => {
    if (item.name.toLowerCase().trim().includes(textLowerCase)) {
      matchingItems.push(item);
    }
  });

  burgers.forEach(item => {
    if (item.name.toLowerCase().trim().includes(textLowerCase)) {
      matchingItems.push(item);
    }
  });

  pita.forEach(item => {
    if (item.name.toLowerCase().trim().includes(textLowerCase)) {
      matchingItems.push(item);
    }
  });
  return matchingItems;

 
}

function renderSearchResults(resultArray){
   menu.innerHTML = "";
      menuHeader.textContent = "Результат пошуку";
      resultArray.forEach(item => {
          const markup = `<li class="menu-list-item">
      <div class="menu-list-item-container">
        
        <div class="svg-like-container">
        <button class="menu-like-btn" type="button" data-info="${item.id}"><svg
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
      <div class="list-item-textcontent-container">
      <h3 class="menu-list-item-header">${item.name}</h3>
      <p class="menu-list-item-price">${item.price} грн</p>
      </div>
      <button class="menu-list-item-add-button" type="button" data-info="${item.id}">Додати</button>
      </div>
    </li>`
    
    menu.insertAdjacentHTML("beforeend", markup);
    if(item.new){
      const menuListItemContainer = document.querySelector(".menu-list-item-container");
      const newMarkup = `<span class="menu-new">New</span>`
      menuListItemContainer.insertAdjacentHTML("afterbegin", newMarkup);
    }
      })
    };





categoryMenuUl.addEventListener("click", (event) => {
  const targetButton = event.target;
  if (targetButton.tagName === "BUTTON") {
      togleActiveButton(targetButton);
      changeCategoryMenu(targetButton);
      const menuAddItemButtons = document.querySelectorAll(".menu-list-item-add-button");
      menuAddItemButtons.forEach(button => {
          button.addEventListener("click", (event) => {
              const itemId = button.getAttribute("data-info");
              displayItemModal(itemId);
              togleMobileMenu(backdrop);
              document.body.style.overflow = "hidden";
          });
      });
      removeLikeEventListeners();
      // Додавання обробників подій для кнопок лайк
      addLikeEventListeners();
      // Додатковий код, якщо потрібно
      togleLikeButton ()
  }
});



modalMenuCloseBtn.addEventListener("click", (event) => {
  togleMobileMenu(backdrop);
  document.body.style.overflow = "auto";
  counter = 1;
  itemsCounter.innerHTML = counter;
});

menuAddItemButtons.forEach(button => {
  button.addEventListener("click", (event) => {
      togleMobileMenu(backdrop);
      document.body.style.overflow = "hidden"; 
  });
});

const countPlusBtn = document.querySelector(".modal-count-plus-btn");
const countMinusBtn = document.querySelector(".modal-count-minus-btn");
const itemsCounter = document.querySelector(".counter");


countPlusBtn.addEventListener("click", (event) => {
  itemsCounter.innerHTML = "";
  counter +=1;
  itemsCounter.innerHTML = counter;
})

countMinusBtn.addEventListener("click",(event) => {
  if(counter > 1){
    counter -=1;
    itemsCounter.innerHTML = counter;
  }
 
});


searchInput.addEventListener("input", (event) => {

  event.preventDefault();
  let text = event.target.value;
  categoryMenuPizzaBtn.classList.remove("is-active");
  categoryMenuBurgerBtn.classList.remove("is-active");
  categoryMenuPitaBtn.classList.remove("is-active");
  const matchingItems = findItemByText(text); // Отримання відповідних елементів
  renderSearchResults(matchingItems);
  menuAddItemButtons = document.querySelectorAll(".menu-list-item-add-button");
  menuAddItemButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const itemId = button.getAttribute("data-info");
        displayItemModal(itemId);
        togleMobileMenu(backdrop);
        document.body.style.overflow = "hidden"; 

    
  })});

  removeLikeEventListeners();
        // Додавання обробників подій для кнопок лайк
  addLikeEventListeners();
        // Додатковий код, якщо потрібно

  togleLikeButton ()


});



addToCartBtn.addEventListener("click", (event) => {
  let itemId = addToCartBtn.getAttribute("data-info");
  let itemObj = { itemId: itemId, count: 1 }; // Початкове значення count - 1
  const orderStorage = localStorage.getItem('order');
  let orderArray = JSON.parse(orderStorage) || []; // Якщо localStorage порожній, створюємо порожній масив
  
  // Перевірка, чи вже існує товар з таким itemId в замовленні
  let existingItemIndex = orderArray.findIndex(item => item.itemId === itemId);

  if (existingItemIndex !== -1) { // Якщо товар існує, збільшуємо кількість
    orderArray[existingItemIndex].count +=1;
    
  } else { // Якщо товару немає в замовленні, додаємо його
    orderArray.push(itemObj);
  }

  let updatedOrderJSON = JSON.stringify(orderArray);
  localStorage.setItem('order', updatedOrderJSON);

  // Додаткові дії, які ви виконуєте після додавання товару в кошик
  togleMobileMenu(backdrop);
  counter = 1;
  itemsCounter.innerHTML = counter;
  document.body.style.overflow = "auto";
});

cartButton.addEventListener("click", (event) => {
  window.location.href = "./cart.html";
});



document.addEventListener("DOMContentLoaded", (event) =>{
  menuAddItemButtons = document.querySelectorAll(".menu-list-item-add-button");
  menuAddItemButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const itemId = button.getAttribute("data-info");
        displayItemModal(itemId);
        togleMobileMenu(backdrop);
        document.body.style.overflow = "hidden";
    });
  });


  removeLikeEventListeners();
        // Додавання обробників подій для кнопок лайк
  addLikeEventListeners();
        // Додатковий код, якщо потрібно
  togleLikeButton ()
});


document.addEventListener("DOMContentLoaded", changeCategoryMenu(categoryMenuPizzaBtn));

// Виклик функції для додавання обробників подій для кнопок лайк під час завантаження сторінки
document.addEventListener("DOMContentLoaded", addLikeEventListeners);