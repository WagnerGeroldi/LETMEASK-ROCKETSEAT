import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyC067LXbt3DMYau0PbEctJqMytzw_sBPgc",
    authDomain: "letmeask-b76dd.firebaseapp.com",
    databaseURL: "https://letmeask-b76dd-default-rtdb.firebaseio.com",
    projectId: "letmeask-b76dd",
    storageBucket: "letmeask-b76dd.appspot.com",
    messagingSenderId: "503201872597",
    appId: "1:503201872597:web:c380c4dbc39de4861f805c"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const database = firebase.database();