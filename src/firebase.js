import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREPASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREPASE_AOUTH_DOMAIM,
  // projectId: process.env.REACT_APP_FIREPASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREPASE_STORAGE_BUCET,
  // messagingSenderId: process.env.REACT_APP_FIREPASE_MESSEDING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREPASE_APP_ID,
  apiKey: "AIzaSyDdjF7FFpHmiHFodh66f4BFlC70HbyyTuE",
  authDomain: "nader-24b9d.firebaseapp.com",
  projectId: "nader-24b9d",
  storageBucket: "nader-24b9d.appspot.com",
  messagingSenderId: "9183415351",
  appId: "1:9183415351:web:902986fa42c17c65b9c3b2",
  measurementId: "G-NQD05DC431",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {auth, db, provider};
