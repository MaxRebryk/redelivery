'use strict';

// Імпорт функцій з SDK, які вам потрібні
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Доданий імпорт auth

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyAerKKFXmuky6LCeiAWuifTbVVPXZ9Tclw',
  authDomain: 're-delivery-cfa80.firebaseapp.com',
  projectId: 're-delivery-cfa80',
  storageBucket: 're-delivery-cfa80.appspot.com',
  messagingSenderId: '425549554900',
  appId: '1:425549554900:web:3f8efb60ffb068d54fc741',
  measurementId: 'G-LEEL210TP7',
};

// Ініціалізація Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app); // Отримання об'єкта auth
