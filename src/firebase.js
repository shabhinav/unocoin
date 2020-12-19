import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB4aZY4EAxffe0pt4QQK4BpYpsnPItI_wc",
  authDomain: "unocoin-28d0e.firebaseapp.com",
  projectId: "unocoin-28d0e",
  storageBucket: "unocoin-28d0e.appspot.com",
  messagingSenderId: "269960106214",
  appId: "1:269960106214:web:19f66f0c22b898fb39eb27",
  measurementId: "G-G84BWH17Z0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
