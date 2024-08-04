// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJsUOPPpIaFEbkVTd6_9tHzaV5W0Nxxgc",
  authDomain: "quickpay-storage.firebaseapp.com",
  projectId: "quickpay-storage",
  storageBucket: "quickpay-storage.appspot.com",
  messagingSenderId: "3680962408",
  appId: "1:3680962408:web:0ee975f59701ce3ab5f8dd",
  measurementId: "G-TP16LNPTNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };