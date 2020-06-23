import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA8tEqjOiIpuEWa7iSupvKs4CKIA9lyOIY",
    authDomain: "hellotter-46073.firebaseapp.com",
    databaseURL: "https://hellotter-46073.firebaseio.com",
    projectId: "hellotter-46073",
    storageBucket: "hellotter-46073.appspot.com",
    messagingSenderId: "173395982219",
    appId: "1:173395982219:web:bd2232a8970e2079e2618e",
    measurementId: "G-G6RD6T6CE0"
};

firebase.initializeApp(firebaseConfig);

