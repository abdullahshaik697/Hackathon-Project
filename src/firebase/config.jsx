
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA60F0daFsyDBzuAN5wOWCAmRcfY7DyK4c",
  authDomain: "myhackathonproject-9febe.firebaseapp.com",
  projectId: "myhackathonproject-9febe",
  storageBucket: "myhackathonproject-9febe.firebasestorage.app",
  messagingSenderId: "110693587305",
  appId: "1:110693587305:web:ee81641f195a99557385f8",
  measurementId: "G-GD01ZZXK9N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

