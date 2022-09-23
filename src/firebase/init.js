// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC35chHXpD7i0-B5aslWSF2eLhd9d3FpMw",
  authDomain: "fir-practice-20c98.firebaseapp.com",
  projectId: "fir-practice-20c98",
  storageBucket: "fir-practice-20c98.appspot.com",
  messagingSenderId: "331294852906",
  appId: "1:331294852906:web:61b2ce4d74391822e14053"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();