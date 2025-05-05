// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjS-_uKcXaMX9YUz2h8xwT3gNuPcey1Us",
  authDomain: "fire-aid-6ca1d.firebaseapp.com",
  projectId: "fire-aid-6ca1d",
  storageBucket: "fire-aid-6ca1d.firebasestorage.app",
  messagingSenderId: "1014828693699",
  appId: "1:1014828693699:web:7f81043ede24253a18ca76",
  measurementId: "G-1K99S6YY58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Export the db instance so you can use it in other files
export { db };