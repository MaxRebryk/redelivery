"use strict";

import * as mobileMenu from './src/js/mobile-menu'

mobileMenu.addMobileMenuListener();


const greetMenuBtn = document.querySelector(".greet-menu-btn");
const recomMenyBtn = document.querySelector(".recom-menu-btn");




greetMenuBtn.addEventListener("click",(event) =>{
    window.location.href = "./src/html/menu.html";
});

recomMenyBtn.addEventListener("click",(event) =>{
    window.location.href = "./src/html/menu.html";
});