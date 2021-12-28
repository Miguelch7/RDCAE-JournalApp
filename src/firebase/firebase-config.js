import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA9yv-o4IPdlC67JNtgJDmuG_VgdsoZGBU",
    authDomain: "react-journal-app-998a6.firebaseapp.com",
    projectId: "react-journal-app-998a6",
    storageBucket: "react-journal-app-998a6.appspot.com",
    messagingSenderId: "825548427561",
    appId: "1:825548427561:web:ac879c02ca9d43cfe0a738"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, 
    googleAuthProvider, 
    firebase
};
