import React from 'react';
import { Button, Layout, Modal, Card, Text, } from '@ui-kitten/components';

import { Image, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import firebase from '../../config/firebase.js';
import { styles } from './styles';
import QuestionText from '../components/componentText';

export const ForgotPassScreen = () => {
  const [email, setEmail] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const navigation = useNavigation();

  function navigateLogin() {
    setEmail('');
    navigation.navigate('Login');
  }

  console.log("renderizou")

  function handleVerifyUser() {
    firebase.auth().sendPasswordResetEmail(email)
      .then(function (user) {
        setMessage('Por favor verifique seu email para redefinir sua senha.')
        setVisible(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
    <Layout style={styles.layoutOut}>
      <Layout style={styles.layoutIn}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/img/logo.png')}
        />
      </Layout>

      <Layout style={styles.layoutIn}>
        <Text style={{ marginTop: 100 }}>Informe o seu email para enviar link de modificação de senha.</Text>
        <QuestionText
          title={'E-mail'}
          value={email}
          setText={newValue => setEmail(newValue)}
          type="email-address"
        />

        {
          (email === '')
            ?
            <Button style={styles.button} status='primary' disabled={true}><Text style={styles.text}>Enviar</Text></Button>
            :
            <Button style={styles.button} status='success' on onPress={handleVerifyUser}><Text style={styles.text}>Enviar</Text></Button>
        }

        <Layout style={styles.layoutButtonRegister}>
          <Button
            style={styles.button}
            status='warning'
            onPress={navigateLogin} appearance='ghost'>
            Cancelar
          </Button>
        </Layout>

        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}>
          <Card disabled={true} style={{ justifyContent: "center", margin: 10 }}>
            <Text style={styles.text}>{message}</Text>
            <Button style={{ width: "90%", margin: 10, }} onPress={() => navigateLogin}>
              OK
            </Button>
          </Card>
        </Modal>

      </Layout>


    </Layout>
    </SafeAreaView>
  );
}
