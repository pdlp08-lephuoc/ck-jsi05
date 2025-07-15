import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyClSM5inFncmsLVDXbyu_ubb-KbJl05gb8",
  authDomain: "jsi05-40e9b.firebaseapp.com",
  projectId: "jsi05-40e9b",
  storageBucket: "jsi05-40e9b.firebasestorage.app",
  messagingSenderId: "172187172352",
  appId: "1:172187172352:web:b3989e5ba822dbb3c662e5",
  measurementId: "G-M12TT1SCF4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const db = getFirestore(app);
export { auth, db };
