'use strict';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAerKKFXmuky6LCeiAWuifTbVVPXZ9Tclw',
  authDomain: 're-delivery-cfa80.firebaseapp.com',
  projectId: 're-delivery-cfa80',
  storageBucket: 're-delivery-cfa80.appspot.com',
  messagingSenderId: '425549554900',
  appId: '1:425549554900:web:3f8efb60ffb068d54fc741',
  measurementId: 'G-LEEL210TP7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var auth = firebase.auth();
const analytics = getAnalytics(app);
