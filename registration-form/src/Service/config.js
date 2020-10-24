import * as firebase from 'firebase';
import 'firebase/firestore';

// Replace this object with your firebase credentials
const firebaseConfig = {
    apiKey: "AIzaSyCpWTXEbdxBncUGbNjdBjvXOKUOo53kNJ4",
    authDomain: "registration-form-3170a.firebaseapp.com",
    databaseURL: "https://registration-form-3170a.firebaseio.com",
    projectId: "registration-form-3170a",
    storageBucket: "registration-form-3170a.appspot.com",
    messagingSenderId: "287451059177",
    appId: "1:287451059177:web:9d9f5fa9bdddc0fca77178"
  };

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();

export { projectStorage };
