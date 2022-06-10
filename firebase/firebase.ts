import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBsW6NnDzhNyXrKBbs3uzD-kdVH-pWYjlM",
    authDomain: "assignment1-302217.firebaseapp.com",
    projectId: "assignment1-302217",
    storageBucket: "assignment1-302217.appspot.com",
    messagingSenderId: "759502811201",
    appId: "1:759502811201:web:2a88f51f7eed8bd125d6c0",
    measurementId: "G-V4V5FJH5R0"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);