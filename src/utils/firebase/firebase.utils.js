import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { async } from "q";

const firebaseConfig = {
  apiKey: "AIzaSyBCh9tF6Xi8XdaERzV1pcnF6aLycvgOA6U",
  authDomain: "crown-clothing-db-bbb00.firebaseapp.com",
  projectId: "crown-clothing-db-bbb00",
  storageBucket: "crown-clothing-db-bbb00.appspot.com",
  messagingSenderId: "707463602589",
  appId: "1:707463602589:web:6098c69820f4429c638f74",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
