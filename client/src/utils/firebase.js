// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClbAI2j_osAN9jeNYpEiJDpHgA-VDWXhE",
  authDomain: "linkly-fc4e9.firebaseapp.com",
  projectId: "linkly-fc4e9",
  storageBucket: "linkly-fc4e9.firebasestorage.app",
  messagingSenderId: "619150092463",
  appId: "1:619150092463:web:f0856e421c56ef238b4c5a",
  measurementId: "G-258DLY7CLS",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
