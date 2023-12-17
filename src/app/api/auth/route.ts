const bcrypt = require("bcrypt");
import { NextRequest, NextResponse } from "next/server";
import { getApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TUserLogin } from "../../../../(types)/TUserLogin";

// // Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);

export async function POST(request: NextRequest) {
  try {
    // Get a Firestore instance
    const db = getFirestore(app);
    const body: TUserLogin = await request.json();
    const usersCollection = collection(db, "users");

    const q = query(usersCollection, where("username", "==", body.username));

    // Fetch the matching documents
    const querySnapshot = await getDocs(q);
    let userData: TUserLogin | undefined;
    querySnapshot.forEach(async (user) => {
      const data = user.data() as TUserLogin;
      userData = data;
    });
    const authenficated = userData
      ? await bcrypt
          .compare(body.password, userData.password)
          .then((result: boolean) => {
            return result;
          })
      : false;
    const res = (await authenficated) ? userData?.role : null;
    if (res !== null) {
      return NextResponse.json({ success: true, res }, { status: 200 });
    } else {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  } catch (error) {
    console.log("Error fetching data:", error);
    return new Response("An error occurred while fetching data", {
      status: 500,
    });
  }
}
