// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd-0fRH8IK4e-rLkkvDi6NU0PKUjwklyM",
  authDomain: "jayalaksalestari-e3978.firebaseapp.com",
  databaseURL:
    "https://jayalaksalestari-e3978-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jayalaksalestari-e3978",
  storageBucket: "jayalaksalestari-e3978.appspot.com",
  messagingSenderId: "425517804668",
  appId: "1:425517804668:web:077510c7324ee8a915adf9",
  measurementId: "G-02NZ53GN9Q",
};

// Initialize Firebase
export const initApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
