import React from 'react';
import {
  Button,
  Layout,
  Modal,
  Card,
  Text,
}
  from '@ui-kitten/components';

import { Image, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import useStore from "../../store/useStore";
import firebase from '../../config/firebase.js';
import SecureText from "../components/secureEntry";
import { styles } from './styles';
import QuestionText from '../components/componentText';

export const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigation = useNavigation();
  const login = useStore(state => state.login)

  const database = firebase.firestore();
  function navigateRegister() {
    setEmail('');
    setPassword('');
    navigation.navigate('Cadastre-se');
  }

  function navigateForgotPassword() {
    setEmail('');
    setPassword('');
    navigation.navigate('Recupere sua conta');
  }

  //valida o tipo do usuario
  // const handleVerifyUser = (email === '' || password === '') 
  // ? 
  // null 
  // : 
  // firebase.auth().signInWithEmailAndPassword(email, password)
  //   .then((userCredential) => {
  //     login(true, userCredential.user.uid);
  //   }).catch((error) => {
  //     setVisible(true);
  //     setError(error.message);
  //   });

  function handleVerifyUser() {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        database.collection("Usuario").where("user_id", "==", userCredential.user.uid).onSnapshot((query) => {
          query.forEach((doc) => {
            console.log("database",doc.data().tipo)
            // setTypeUser(decrytpInformation(doc.data().tipo));
            // setSentinela(false);
        })});
        login(true, userCredential.user.uid);
      }).catch((error) => {
        setVisible(true);
        setError(error.message);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
    <Layout style={styles.layoutOut}>

      <Layout style={styles.layoutImage}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/img/logo.png')}
        />
      </Layout>

      <Layout style={styles.layoutIn}>

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
            <Button style={styles.button} status='success' on onPress={handleVerifyUser}><Text style={styles.text}>Login</Text></Button>
        }
        <Layout style={styles.layoutButtonEsqueciSenha}>
          <Button style={styles.button} status='control' onPress={navigateForgotPassword} appearance='ghost'>Esqueci minha senha</Button>
        </Layout>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}>
          <Card disabled={true} style={{ justifyContent: "center", margin: 10 }}>
            <Text style={styles.text}>E-mail e/ou senha inválidos.{"\n"}Erro: {error}</Text>
            <Button style={{ width: "90%", margin: 10, }} onPress={() => setVisible(false)}>
              OK
            </Button>
          </Card>
        </Modal>

      </Layout>
      <Layout style={styles.layoutButtonRegister}>
          <Button style={styles.button} status='warning' onPress={navigateRegister} appearance='ghost'>Cadastrar-se</Button>
        </Layout>
    </Layout>
    </SafeAreaView>
  );
}
