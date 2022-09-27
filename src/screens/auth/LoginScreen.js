import React from 'react';
import {
  Button,
  Layout,
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
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigation = useNavigation();
  const login = useStore(state => state.login)

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

  console.log("renderizou")

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
        login(true, userCredential.user.uid);
      }).catch((error) => {
        setVisible(true);
        setError(error.message);
      });
  }

  return (
    <Layout style={styles.layoutOut}>

      <Layout style={styles.layoutIn}>
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

        <Button style={styles.button} status='warning' onPress={navigateRegister} appearance='ghost'>Cadastrar-se</Button>


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


    </Layout>
  );
}
