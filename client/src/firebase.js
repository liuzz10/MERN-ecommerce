import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS87N5FBQ0oa8at57lgPBJ4pofYtoxYO4",
  authDomain: "ecommerce-ff653.firebaseapp.com",
  databaseURL: "https://ecommerce-ff653.firebaseio.com",
  projectId: "ecommerce-ff653",
  storageBucket: "ecommerce-ff653.appspot.com",
  messagingSenderId: "855979053748",
  appId: "1:855979053748:web:82ef6573e980d1459dfde1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
