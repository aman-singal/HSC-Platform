import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDd69a2qzkYljyinmHn1I-pZsGw5nh8bTI",
  authDomain: "hindustanscrap-9a424.firebaseapp.com",
  projectId: "hindustanscrap-9a424",
  storageBucket: "hindustanscrap-9a424.firebasestorage.app",
  messagingSenderId: "982310834934",
  appId: "1:982310834934:web:280821101c7ca4fa7312d7",
  measurementId: "G-H6ZXG22F4Y"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
