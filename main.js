"use strict";


const mobileMenuOpenBtn = document.querySelector(".mobile-menu-open-button");
const mobileMenuCloseBtn = document.querySelector(".close-mobile-menu-btn");


function togleMobileMenu (){
    const mobileMenu = document.querySelector(".modal-mobile-menu");
    mobileMenu.classList.toggle("is-open");
}

mobileMenuOpenBtn.addEventListener("click", togleMobileMenu);
mobileMenuCloseBtn.addEventListener("click",togleMobileMenu);