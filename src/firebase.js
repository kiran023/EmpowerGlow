import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDTbkF3lVpNHxqgV8O25atWzEemJ7c50PY",
  authDomain: "login-auth-da365.firebaseapp.com",
  databaseURL: "https://login-auth-da365-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "login-auth-da365",
  storageBucket: "login-auth-da365.appspot.com",
  messagingSenderId: "96032129097",
  appId: "1:96032129097:web:631770057b02ae7680ff98",
  measurementId: "G-1XGL6YVSQE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getFirestore(app);