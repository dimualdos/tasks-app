import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import {
     getAuth,
     signOut, 
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     sendPasswordResetEmail,
     updateProfile,
     signInWithCredential,
     GithubAuthProvider,
     OAuthProvider,
     GoogleAuthProvider,
     onAuthStateChanged,
  } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAV3worDwSBYWV3OvICa6OeGuuMQcuO5M8",
  authDomain: "tasks-app-707e8.firebaseapp.com",
  projectId: "tasks-app-707e8",
  storageBucket: "tasks-app-707e8.appspot.com",
  messagingSenderId: "292583529058",
  appId: "1:292583529058:web:78f4deaa8e32cd2deccf3b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
// const user = auth.currentUser;
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
export const register =
 (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);
export const loginFireBase = (email: string, password: string) => 
signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);
export const updateUser = (name: string) => updateProfile(auth.currentUser!, {displayName: name});
export const githubProvider = new GithubAuthProvider();
export const googleProvider = new GoogleAuthProvider();
export const oAuthProvider = new OAuthProvider('google.com');
// export const signInWithGithub = () => signInWithCredential(auth, githubProvider.credential());
// export const signInWithGoogle = () => signInWithCredential(auth, googleProvider.credential());
