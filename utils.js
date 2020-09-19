const secret = "ecrancreatedbyelvisduru";

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

const firebase = require("firebase/app");
require("firebase/storage");
firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();

const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "ecran-fe278.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = { secret, storageRef, bucket };
