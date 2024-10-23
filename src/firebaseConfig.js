import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAuHCcmAB8ZCPw4itDCW4OwA39xUnYuBV4",
    authDomain: "sicemor-app.firebaseapp.com",
    projectId: "sicemor-app",
    storageBucket: "sicemor-app.appspot.com",
    messagingSenderId: "839221556141",
    appId: "1:839221556141:web:cc5e366454c0f852182724",
    measurementId: "G-CH2D1WRJQG"
};

console.log("Initializing Firebase app...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase app initialized");

export { db };