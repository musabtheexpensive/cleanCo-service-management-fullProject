// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAROgDcQm-JHcv3YLMLSYPEmIObfbymSvM",
  authDomain: "auth-project-51module-firebase.firebaseapp.com",
  projectId: "auth-project-51module-firebase",
  storageBucket: "auth-project-51module-firebase.appspot.com",
  messagingSenderId: "1043701695169",
  appId: "1:1043701695169:web:c6a8daac62aa9fef738a40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
