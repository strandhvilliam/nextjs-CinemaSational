import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCEL8yr8q6gfANO8LylMhfI98T4I2d1sPg",
    authDomain: "cinema-sational.firebaseapp.com",
    projectId: "cinema-sational",
    storageBucket: "cinema-sational.appspot.com",
    messagingSenderId: "475304980667",
    appId: "1:475304980667:web:7b098b7c015a4e63c3399e",
    measurementId: "G-LZB7XYSWQC"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
