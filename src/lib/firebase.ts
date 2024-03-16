import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cloud-connect-pro-ae65d.firebaseapp.com",
  projectId: "cloud-connect-pro-ae65d",
  storageBucket: "cloud-connect-pro-ae65d.appspot.com",
  messagingSenderId: "956682154420",
  appId: "1:956682154420:web:83eb3e5d21abe2a92602e1",
  measurementId: "G-MNSQH4KQKN",
};

// const app = initializeApp(firebaseConfig);
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);
export { db };

// const analytics = getAnalytics(app);
