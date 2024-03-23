"use strict";


const mobileMenuOpenBtn = document.querySelector(".mobile-menu-open-button");
const mobileMenuCloseBtn = document.querySelector(".close-mobile-menu-btn");
const greetMenuBtn = document.querySelector(".greet-menu-btn");
const recomMenyBtn = document.querySelector(".recom-menu-btn");


function togleMobileMenu (){
    const mobileMenu = document.querySelector(".modal-mobile-menu");
    mobileMenu.classList.toggle("is-open");
    document.body.style.overflow = "hidden"; 
}

function hrefTo (url){
    window.location.href = url;
}


mobileMenuOpenBtn.addEventListener("click", togleMobileMenu);
mobileMenuCloseBtn.addEventListener("click",(event) =>{
    togleMobileMenu();
    document.body.style.overflow = "auto";
});

greetMenuBtn.addEventListener("click",(event) =>{
    hrefTo("./src/html/menu.html");
});

recomMenyBtn.addEventListener("click",(event) =>{
    hrefTo("./src/html/menu.html");
});