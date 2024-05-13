'use strict';

import * as mobileMenu from '../js/mobile-menu.js';
import * as firebase from './firebase.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'; // Доданий імпорт auth

mobileMenu.addMobileMenuListener();

const loginForm = document.querySelector('.login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const loginErrorMessage = document.querySelector('.error-login-text');

// Додаємо обробник подій для події 'submit' форми
loginForm.addEventListener('submit', async event => {
  event.preventDefault(); // Зупиняємо стандартну поведінку відправки форми

  const email = emailInput.value;
  const password = passwordInput.value;
  const name = nameInput.value;
  const phone = phoneInput.value;

  try {
    // Викликаємо функцію аутентифікації Firebase
    const userCredential = await createUserWithEmailAndPassword(
      firebase.auth,
      email,
      password
    );

    // Успішно автентифіковано
    const user = userCredential.user;

    // Встановлюємо ім'я та номер телефону користувача
    await updateProfile(user, {
      displayName: name,
      phoneNumber: phone,
    });

    console.log('Успішна реєстрація: ', user);
    window.location.href = './profile.html';
    // Тут можна перенаправити користувача на іншу сторінку або виконати інші дії
  } catch (error) {
    // Помилка реєстрації
    console.error('Помилка реєстрації: ', error.message);
    emailInput.value = '';
    passwordInput.value = '';
    nameInput.value = '';
    phoneInput.value = '';
    loginErrorMessage.textContent = 'Помилка реєстрації: ' + error.message;
    // Тут можна вивести помилку користувачеві або виконати інші дії
  }
});