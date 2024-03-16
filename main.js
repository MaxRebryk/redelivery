"use strict";


const mobileMenuOpenBtn = document.querySelector(".mobile-menu-open-button");
const mobileMenuCloseBtn = document.querySelector(".close-mobile-menu-btn");


function togleMobileMenu (){
    const mobileMenu = document.querySelector(".modal-mobile-menu");
    mobileMenu.classList.toggle("is-open");
    document.body.style.overflow = "hidden"; 
}

mobileMenuOpenBtn.addEventListener("click", togleMobileMenu);
mobileMenuCloseBtn.addEventListener("click",(event) =>{
    togleMobileMenu();
    document.body.style.overflow = "auto";
});