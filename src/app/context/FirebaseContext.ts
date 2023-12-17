import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import React from "react";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "jayalaksalestari-e3978.firebaseapp.com",
  databaseURL:
    "https://jayalaksalestari-e3978-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jayalaksalestari-e3978",
  storageBucket: "jayalaksalestari-e3978.appspot.com",
  messagingSenderId: "425517804668",
  appId: "1:425517804668:web:077510c7324ee8a915adf9",
  measurementId: "G-02NZ53GN9Q",
};

// // Initialize Firebase app
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const FirebaseContext = React.createContext(app);
