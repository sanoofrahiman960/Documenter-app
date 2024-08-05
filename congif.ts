// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXQHu2aURIRYkBckvJ_wVy29dAzDaS0Fk",
    authDomain: "uploadfiles-2de2d.firebaseapp.com",
    projectId: "uploadfiles-2de2d",
    storageBucket: "uploadfiles-2de2d.appspot.com",
    messagingSenderId: "446342148067",
    appId: "1:446342148067:web:a7a0fb4d11e17570b6fad6",
    measurementId: "G-EXNTZL5S18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
