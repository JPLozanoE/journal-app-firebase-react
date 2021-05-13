import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBbQgnCJWgKkmpWoECD2cKIt12FLkNRYYQ",
    authDomain: "react-apps-fh.firebaseapp.com",
    projectId: "react-apps-fh",
    storageBucket: "react-apps-fh.appspot.com",
    messagingSenderId: "91854091048",
    appId: "1:91854091048:web:c5cbe39872cae83e01d61d"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export{
      db,
      googleAuthProvider,
      firebase
  }