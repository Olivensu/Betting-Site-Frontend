// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC58P1-ecPFxQUCLne0vxpbJ1pmgT2RMSg",
    authDomain: "betting-site-7fed7.firebaseapp.com",
    projectId: "betting-site-7fed7",
    storageBucket: "betting-site-7fed7.appspot.com",
    messagingSenderId: "697868204402",
    appId: "1:697868204402:web:0c5e17824a6b43129d45eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export default auth;