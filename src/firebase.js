import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyA01bOcDFvj88VBvKP2U4JbvLalcUox04s",
    authDomain: "clone1-f30a1.firebaseapp.com",
    projectId: "clone1-f30a1",
    storageBucket: "clone1-f30a1.appspot.com",
    messagingSenderId: "258356084865",
    appId: "1:258356084865:web:1b15406bace3d058568d80",
    measurementId: "G-ZBWNT90YQS"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  const db = firebaseApp.firestore();

  export {auth, provider}
  export default db