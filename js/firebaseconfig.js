import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx3gcGTid_R7hUzQA9zw4HGwPb_a_Z-KI",
  authDomain: "ck-project-d8f52.firebaseapp.com",
  projectId: "ck-project-d8f52",
  storageBucket: "ck-project-d8f52.firebasestorage.app",
  messagingSenderId: "205192602499",
  appId: "1:205192602499:web:8a0c05032c314a270d0cb6",
  measurementId: "G-5JTWWV4WM5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const db = getFirestore(app);
export { auth, db };
