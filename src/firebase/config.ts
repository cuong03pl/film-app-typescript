import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2mYQbqHM4u3vdBckfffovoQ--N-ZXWWc",
  authDomain: "film-app-6d4ec.firebaseapp.com",
  projectId: "film-app-6d4ec",
  storageBucket: "film-app-6d4ec.appspot.com",
  messagingSenderId: "562686510434",
  appId: "1:562686510434:web:4c198cf800986389d1183b",
  measurementId: "G-W2DS0HYML2",
};
let app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
// Google
const providerGoogle = new GoogleAuthProvider();
providerGoogle.addScope("https://www.googleapis.com/auth/contacts.readonly");

export const signInWithGoogle = () => {
  return signInWithPopup(auth, providerGoogle);
};

const providerFacebook = new FacebookAuthProvider();
providerFacebook.addScope("user_birthday");
export const signInWithFacebook = () => {
  return signInWithPopup(auth, providerFacebook);
};
