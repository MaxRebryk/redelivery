'use strict';

import * as mobileMenu from '../js/mobile-menu.js';
import * as firebase from './firebase.js';
import cartCount from './cartCounter.js';

import { signInWithEmailAndPassword } from 'firebase/auth'; // Доданий імпорт auth

mobileMenu.addMobileMenuListener();
cartCount();

const loginForm = document.querySelector('.login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginErrorMessage = document.querySelector('.error-login-text');
const favButton = document.querySelector('.fav-button');
const profileButton = document.querySelector('.profile-button');
const cartButton = document.querySelector('.cart-button');

cartButton.addEventListener('click', event => {
  window.location.href = './menu.html';
});

favButton.addEventListener('click', event => {
  window.location.href = './favourite.html';
});

profileButton.addEventListener('click', event => {
  window.location.href = './profile.html';
});

// Додаємо обробник подій для події 'submit' форми
loginForm.addEventListener('submit', event => {
  event.preventDefault(); // Зупиняємо стандартну поведінку відправки форми

  const email = emailInput.value;
  const password = passwordInput.value;

  // Викликаємо функцію аутентифікації Firebase
  signInWithEmailAndPassword(firebase.auth, email, password)
    .then(userCredential => {
      // Успішно автентифіковано
      const user = userCredential.user;
      console.log('Успішний вхід: ', user);
      localStorage.setItem('userLoggedIn', JSON.stringify(user));
      window.location.href = './profile.html';
      // Тут можна перенаправити користувача на іншу сторінку або виконати інші дії
    })
    .catch(error => {
      // Помилка входу
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Помилка входу: ', errorMessage);
      emailInput.value = '';
      passwordInput.value = '';
      loginErrorMessage.textContent = 'Неправильний логін або пароль*';
      // Тут можна вивести помилку користувачеві або виконати інші дії
    });
});
