// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu_EJujDB_gviiZscMF1ON_URgg_7olEk",
  authDomain: "greenroot-b5258.firebaseapp.com",
  databaseURL: "https://greenroot-b5258-default-rtdb.firebaseio.com",
  projectId: "greenroot-b5258",
  storageBucket: "greenroot-b5258.firebasestorage.app",
  messagingSenderId: "73919337791",
  appId: "1:73919337791:web:aa8564ba05e34b83682f8a",
  measurementId: "G-FYDXLG646B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export default app;
