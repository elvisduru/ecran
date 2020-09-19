import * as firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7MjB3q0_LJaMZiN-bB3mL56mOHC-bFMM",
  authDomain: "ecran-fe278.firebaseapp.com",
  databaseURL: "https://ecran-fe278.firebaseio.com",
  projectId: "ecran-fe278",
  storageBucket: "ecran-fe278.appspot.com",
  messagingSenderId: "68777747614",
  appId: "1:68777747614:web:2933f62bbf054fdf15478f",
  measurementId: "G-4KRRCQR6ZX",
};

firebase.initializeApp(firebaseConfig);
export const storageRef = firebase.storage().ref();
