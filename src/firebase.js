import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsrOSa8GGAHdNIeFE3ruuEwDriL-k7wSg",
  authDomain: "smart-proxy-425512-e4.firebaseapp.com",
  projectId: "smart-proxy-425512-e4",
  storageBucket: "smart-proxy-425512-e4.appspot.com",
  messagingSenderId: "257677539298",
  appId: "1:257677539298:web:93f4791453bdbe7cd2abbb",
  measurementId: "G-YKS71QZSEE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
