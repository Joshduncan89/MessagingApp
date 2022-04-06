// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_6ko_sXNCnMx-fi5HbTtGrr_lJea-j0M",
  authDomain: "messageapp-13386.firebaseapp.com",
  projectId: "messageapp-13386",
  storageBucket: "messageapp-13386.appspot.com",
  messagingSenderId: "959791976311",
  appId: "1:959791976311:web:13cdf9010f75c9a9db5b72",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { app, db, storage, auth, provider };
