// firebase.jsx
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDcL59urY0B0QTCovpVyEJKYABrR7C92YI",
  authDomain: "kapoorlehengasaree-8dcee.firebaseapp.com",
  projectId: "kapoorlehengasaree-8dcee",
  storageBucket: "kapoorlehengasaree-8dcee.firebasestorage.app",
  messagingSenderId: "362346203086",
  appId: "1:362346203086:web:c2c1826c0d42b2f7f64d9f",
  measurementId: "G-PX262PC21T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth and provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

export default firebaseConfig;
