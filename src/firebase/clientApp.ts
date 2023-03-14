import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; //used to store json key value pairs
import { getStorage } from "firebase/storage"; //used to store media

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_MEASUREMENTID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBjwjRjVElMZ0yhLG_X0Hz3y_bbH3_iDvw",
  authDomain: "instagram-clone-40909.firebaseapp.com",
  projectId: "instagram-clone-40909",
  storageBucket: "instagram-clone-40909.appspot.com",
  messagingSenderId: "1064462505615",
  appId: "1:1064462505615:web:6aafa78a1160de980d42fa",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app); //gets database
const auth = getAuth(app); //gets auth
const storage = getStorage(app); //gets file storage system

export { app, firestore, auth, storage };
