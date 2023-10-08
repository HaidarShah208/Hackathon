// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQfAtH6URh_CyW4DBtTN-DmeHL20QkFyY",
  authDomain: "hackathon-fd000.firebaseapp.com",
  projectId: "hackathon-fd000",
  storageBucket: "hackathon-fd000.appspot.com",
  messagingSenderId: "722031475849",
  appId: "1:722031475849:web:c387e3131caaf613365a58",
  measurementId: "G-EW0P04FR88"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {analytics, auth, firestore, storage}