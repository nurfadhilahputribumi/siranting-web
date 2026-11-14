import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8o-_3Zi7fmgfUIvLooaBUf-yvwZyEKoQ",
  authDomain: "siranting-b52dd.firebaseapp.com",
  projectId: "siranting-b52dd",
  storageBucket: "siranting-b52dd.firebasestorage.app",
  messagingSenderId: "626913526905",
  appId: "1:626913526905:web:4af8ebf4330c31932880a8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const authReady = signInAnonymously(auth)
  .then(() => {
    console.log("Anonymous authentication berhasil");
  })
  .catch((error) => {
    console.error(
      "Anonymous authentication gagal:",
      error
    );

    throw error;
  });

export default app;