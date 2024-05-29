// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from  "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA27V1Bqllr087aBU6slj593R_aU5o3nHU",
  authDomain: "filmyworld-2f6c2.firebaseapp.com",
  projectId: "filmyworld-2f6c2",
  storageBucket: "filmyworld-2f6c2.appspot.com",
  messagingSenderId: "381768633651",
  appId: "1:381768633651:web:29752a17a63ee1688a0246"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const movieRef= collection(db, "movies");
export const reviewRef= collection(db, "reviews");
export const userRef= collection(db, "user");



export default app;