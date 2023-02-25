// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxeJGWGJ_ZkiYndf514okQzot9qylqXBI",
    authDomain: "trendy-tees.firebaseapp.com",
    projectId: "trendy-tees",
    storageBucket: "trendy-tees.appspot.com",
    messagingSenderId: "804364917884",
    appId: "1:804364917884:web:dca926b7ace4e051aebdf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;