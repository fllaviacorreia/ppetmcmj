import firebase from 'firebase';

import Config from "react-native-config";
import {APP_ID} from "@env";

console.log("APP_ID",APP_ID)
// Your web app's Firebase configuration
// var firebaseConfig = {
//     apiKey: Config.APP_ID,
//     authDomain: Config.AUTH_DOMAIN,
//     projectId: Config.PROJECT_ID,
//     storageBucket: Config.STORAGE_BUCKET,
//     messagingSenderId: Config.MESSAGING_SENDER_ID,
//     appId: Config.APP_ID
//   };

var firebaseConfig = {
  apiKey: "AIzaSyDmTDnf_9o4ANK3JvHwPvra5FmeA2CLP7U",
  authDomain: "questionario-srq20.firebaseapp.com",
  projectId: "questionario-srq20",
  storageBucket: "questionario-srq20.appspot.com",
  messagingSenderId: "736972695900",
  appId: "1:736972695900:web:46ee038f2a817aa250f999"
};
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;