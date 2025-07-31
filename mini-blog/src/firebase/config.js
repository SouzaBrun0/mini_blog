import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3wQ9v6HMcAV0SaVBjlhdEr65OEjO8TmA",
  authDomain: "mini-blog-8cc52.firebaseapp.com",
  projectId: "mini-blog-8cc52",
  storageBucket: "mini-blog-8cc52.firebasestorage.app",
  messagingSenderId: "56154858863",
  appId: "1:56154858863:web:c017f6187269c4af63b49a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};