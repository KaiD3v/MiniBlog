import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA9gXE_QftHY2bn5HBebvzqxP7rCQmaQek",
  authDomain: "miniblog-d407a.firebaseapp.com",
  projectId: "miniblog-d407a",
  storageBucket: "miniblog-d407a.appspot.com",
  messagingSenderId: "182546509333",
  appId: "1:182546509333:web:6e14198616a777a7fb681c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db;