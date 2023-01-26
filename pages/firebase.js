// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYyTARcKIuUsBeq8bcbnMPiH7a-9NoJa4",
  authDomain: "instagram-90c46.firebaseapp.com",
  projectId: "instagram-90c46",
  storageBucket: "instagram-90c46.appspot.com",
  messagingSenderId: "863366198214",
  appId: "1:863366198214:web:96aa1b20ffe47511ba78c7",
  measurementId: "G-GNZM2R60D5",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
