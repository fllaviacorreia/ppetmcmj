import React from 'react';
import {
Button,
Divider,
Layout,
Input,
Modal,
Card,
Text,
}
  from '@ui-kitten/components';

import { Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import useStore from "../../store/useStore";
import firebase from '../../config/firebase.js';
import SecureText from "../components/secureEntry";

import { styles } from './styles';
import QuestionText from '../components/componentText';

export const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const [type, setType] = React.useState('');
  const [error, setError] = React.useState(null);

  const [visible, setVisible] = React.useState(false);
  
  const navigation = useNavigation();
  const database = firebase.firestore();

  const login = useStore(state => state.login)

  const navigateRegister = () => {
    navigation.navigate('Cadastrar-se');
  };

  
  //valida entradas de login
  function verifyUser(){   
    // const email = "fllaviacorreia@outlook.com";
    // firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    // .then(() => {
    //   // The link was successfully sent. Inform the user.
    //   // Save the email locally so you don't need to ask the user for it again
    //   // if they open the link on the same device.
    //   window.localStorage.setItem('emailForSignIn', email);
    //   // ...
    // })
    // .catch((error) => {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    // });

  
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        // Create a reference to the cities collection
        // var users = database.collection("Usuario").where("user_id", "==", userCredential.user.uid)
        // .get()
        // .then((querySnapshot) => {
        //   querySnapshot.forEach((doc) => {
        //       // doc.data() is never undefined for query doc snapshots
              login(true, userCredential.user.uid, "acs");
       //   });
      // })
      // .catch((error) => {
      //     console.log("Error getting documents: ", error);
      // });

    }).catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        setVisible(true);
        setError(error.message)
      });
  }

  return (
    <Layout style={{ flex: 1, alignItems: 'center', backgroundColor: "#AEBD91"}}>
      
      <Divider />
      <Layout style={styles.layout}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/img/logo.png')}
      />
        <QuestionText
          title={'E-mail'}
          value={email}
          setText={newValue => setEmail(newValue)}
          type="email-address"
        />
        <SecureText
          value={password}
          label="Senha"
          setValue={setPassword}
        />

        {
          (email === '' || password === '') 
          ? 
            <Button style={styles.button} status='primary' disabled={true}><Text style={styles.text}>Login</Text></Button>
          :
          <Button style={styles.button} status='primary' on onPress={verifyUser}><Text style={styles.text}>Login</Text></Button>
        }

        
        <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style={{justifyContent:"center", margin:10}}>
          <Text style={styles.text}>E-mail e/ou senha inválidos.{"\n"}Erro: {error}</Text>
          <Button style={{width:"90%", margin:10,}} onPress={() => setVisible(false)}>
            OK
          </Button>
        </Card>
      </Modal>
      </Layout>

      <Button style={styles.button} status='warning' onPress={navigateRegister} appearance='ghost'>Cadastre-se</Button>

    </Layout>
  );
}
