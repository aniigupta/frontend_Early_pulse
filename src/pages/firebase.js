// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBrYDJQcMkiIO2zXie8v6YRfQGjGfah45w",
  authDomain: "earlypulse-6f32c.firebaseapp.com",
  projectId: "earlypulse-6f32c",
  storageBucket: "earlypulse-6f32c.firebasestorage.app",
  messagingSenderId: "680075022219",
  appId: "1:680075022219:web:f0383fcbbe8b14f4fe698e",
  measurementId: "G-DS8P0P90KY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth ,app};