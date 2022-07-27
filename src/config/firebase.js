import firebase from 'firebase';

import Config from "react-native-config";

console.log("API KEY", Config)

const API_KEY =Config.API_KEY;

console.log("API KEY", API_KEY)
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: Config.APP_ID,
    authDomain: Config.AUTH_DOMAIN,
    projectId: Config.PROJECT_ID,
    storageBucket: Config.STORAGE_BUCKET,
    messagingSenderId: Config.MESSAGING_SENDER_ID,
    appId: Config.APP_ID
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;