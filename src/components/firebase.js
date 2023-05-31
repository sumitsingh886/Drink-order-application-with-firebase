import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDkbngknYfg7QPgwNt1G5yUk7QyTDj51v8",
  authDomain: "beverage-848ae.firebaseapp.com",
  projectId: "beverage-848ae",
  storageBucket: "beverage-848ae.appspot.com",
  messagingSenderId: "822976181055",
  appId: "1:822976181055:web:418d6c016180942e70198a",
  measurementId: "G-P522SGQHJP"
});

const db = firebaseApp.firestore();
export default db;