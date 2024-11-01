// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "videomatic-ai-5c2b2.firebaseapp.com",
  projectId: "videomatic-ai-5c2b2",
  storageBucket: "videomatic-ai-5c2b2.appspot.com",
  messagingSenderId: "663560280307",
  appId: "1:663560280307:web:bd79a2e97bf6c62d693f86",
  measurementId: "G-80MYDX1BMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);