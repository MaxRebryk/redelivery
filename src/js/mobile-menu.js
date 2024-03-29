"use strict"

const mobileMenuOpenBtn = document.querySelector(".mobile-menu-open-button");
const mobileMenuCloseBtn = document.querySelector(".close-mobile-menu-btn");



export function togleMobileMenu (){
    const mobileMenu = document.querySelector(".modal-mobile-menu");
    const mobileMenuOpenBtn = document.querySelector(".mobile-menu-open-button");
    const mobileMenuCloseBtn = document.querySelector(".close-mobile-menu-btn");
    mobileMenu.classList.toggle("is-open");
    document.body.style.overflow = "hidden"; 

}

export function addMobileMenuListener (){
    mobileMenuOpenBtn.addEventListener("click", togleMobileMenu);
    mobileMenuCloseBtn.addEventListener("click",(event) =>{
        togleMobileMenu();
        document.body.style.overflow = "auto";
    });
}

