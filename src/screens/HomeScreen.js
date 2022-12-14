import React from 'react';
import {
  Button,
  Divider,
  Layout,
  StyleService
}
  from '@ui-kitten/components';

import { useNavigation } from "@react-navigation/native";
import useStore from "../store/useStore";
import firebase from '../config/firebase';

import CryptoJS from "react-native-crypto-js";

export const HomeScreen = () => {
  const [sentinela, setSentinela] = React.useState(true);

  const setIsLoggedIn = useStore(state => state.login);
  const navigation = useNavigation();

  const isSignedIn = useStore(state => state.isSignedIn);
  const userID = useStore(state => state.userID);
  const typeUser = useStore(state => state.type);
  const database = firebase.firestore();

  const [tipo, setTipo] = React.useState('');

  console.log("stateuser", isSignedIn, "iduser", userID, "typeuser", typeUser)

  React.useEffect(() => {
    if (sentinela && userID) {
      getUserType();
    }
  }
  );

  //log out
  function onLogOut() {
    setIsLoggedIn(false, null, null);
  }

  //decrypt information about user
  function decrytpInformation(value) {
    const SECRET_KEY = process.env.SECRET_KEY;
    console.log("SECRET_KEY",SECRET_KEY)
    const decrypted = CryptoJS.AES.decrypt(
      value,
      SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);

    console.log("value",value)
    console.log("decrypted",decrypted)
    return decrypted;
  }

  //set type user in global state
  const setTypeUser = () => {
    setIsLoggedIn(isSignedIn, userID, decrytpInformation(tipo));
  }

  function getUserType(){
    database.collection("Usuario").where("user_id", "==", userID).onSnapshot((query) => {
    query.forEach((doc) => {
      console.log("database",doc.data().tipo)
      // setTypeUser(decrytpInformation(doc.data().tipo));
      // setSentinela(false);
  })
});
  }

  //go to new questionnaire page
  const navigateNewQuestionnaire = () => {
    navigation.navigate('Novo questionário SRQ-20');
  };

  return (
    <Layout style={{ flex: 1, alignItems: 'center' }}>
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button style={styles.button} size='medium' onPress={navigateNewQuestionnaire}>Novo questionário SRQ-20</Button>
      </Layout>
      <Button style={styles.button} onPress={onLogOut} appearance='ghost'>Sair</Button>
    </Layout>
  );
};

const styles = StyleService.create({
  button: {
    marginTop: 10,
    padding: 10,
    width: 300,
    fontSize: 15,
  },

});
