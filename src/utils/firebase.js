// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgXWKiAJmCinBOMVUKVh5KoHnF9s2syp8",
  authDomain: "quickpay-5e072.firebaseapp.com",
  projectId: "quickpay-5e072",
  storageBucket: "quickpay-5e072.appspot.com",
  messagingSenderId: "281877176185",
  appId: "1:281877176185:web:8d8b536a5c08b01e8159a8",
  measurementId: "G-Q0B316BSXG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };
