// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "qr-scan-d54e6.firebaseapp.com",
  projectId: "qr-scan-d54e6",
  storageBucket: "qr-scan-d54e6.appspot.com",
  messagingSenderId: "119704944968",
  appId: "1:119704944968:web:c7f6660106cd1a8a8ef37d",
  measurementId: "G-YB92291EVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getStorage(app)

export { db, auth}

