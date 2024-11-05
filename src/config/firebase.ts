// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// Get this from your Firebase Console
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDKZhN667zIeHMwbigcWXkYfaARPauSo9Q",
  authDomain: "rahmas-edf89.firebaseapp.com",
  databaseURL: "https://rahmas-edf89-default-rtdb.firebaseio.com",
  projectId: "rahmas-edf89",
  storageBucket: "rahmas-edf89.firebasestorage.app",
  messagingSenderId: "1004306734811",
  appId: "1:1004306734811:web:38f3d8cc3bfd1db550f6fe",
  measurementId: "G-04J5S7NRJJ"
};
console.log('Firebase Config:', firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export { firebaseConfig };

export default app;