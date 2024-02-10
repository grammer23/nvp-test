import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBzGacReHjX8jTNlpgY0Pyg85RtcgwNnXg",
  authDomain: "nvp-test-70081.firebaseapp.com",
  projectId: "nvp-test-70081",
  storageBucket: "nvp-test-70081.appspot.com",
  messagingSenderId: "220420133910",
  appId: "1:220420133910:web:d7d8c2c0b7d86cfa1e9137",
  measurementId: "G-PSVCEC933N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app