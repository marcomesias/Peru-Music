
import firebase from 'firebase'
  // Initialize Firebase
const  config = {
    apiKey: "AIzaSyDUaft48viKAzWqE90cRkF3-iFRjKuJ1Qo",
    authDomain: "fun-food-friends-ea21d.firebaseapp.com",
    databaseURL: "https://fun-food-friends-ea21d.firebaseio.com",
    projectId: "fun-food-friends-ea21d",
    storageBucket: "fun-food-friends-ea21d.appspot.com",
    messagingSenderId: "1020743059172"
  };
  firebase.initializeApp(config);

  //Autenticacion
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  //Exporta 
  export default firebase; 
