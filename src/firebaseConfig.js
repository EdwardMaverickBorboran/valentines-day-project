// filepath: /D:/Downloads/valentines-project/valentines day project/src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC8Pw_nD_RfLZRzB2scVYkh40r9VFTPgiI",
    authDomain: "valentines-day-project.firebaseapp.com",
    projectId: "valentines-day-project",
    storageBucket: "valentines-day-project.firebasestorage.app",
    messagingSenderId: "467950776612",
    appId: "1:467950776612:web:4045685e73f9ee3db503b1"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };