import React from 'react';
import {
  Button,
  Divider,
  Layout,
  Input,
  Toggle,
  Modal,
  Card
}
  from '@ui-kitten/components';

import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  Image,
}
  from 'react-native';

import CryptoJS from "react-native-crypto-js";

import useStore from "../../store/useStore";
import firebase from '../../config/firebase.js';
import SecureText from "../components/secureEntry";
import { styles } from './styles';
import QuestionDate from '../components/componentDate';
import QuestionText from '../components/componentText';

export const RegisterScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [dateBorn, setDateBorn] = React.useState(new Date());
  const [fullName, setFullName] = React.useState('');
  const [cpf, setCPF] = React.useState('');
  const [type, setType] = React.useState('');

  const [checked, setChecked] = React.useState(false);

  const [visible, setVisible] = React.useState(false);

  const [error, setError] = React.useState(null);

  const login = useStore(state => state.login)
  const navigation = useNavigation();
  const database = firebase.firestore();

  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  function encrytpInformation(value){
      const encrypted = CryptoJS.AES.encrypt(
        value
      ).toString();

      return encrypted;
  }

  function decrytpInformation(value){
    const decrypted = CryptoJS.AES.decrypt(
      value
    ).toString(CryptoJS.enc.Utf8);

    return decrypted;
}

  //valida entradas de registro
  function verifyUser() {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        database.collection("Usuario").add({
          nome_completo: fullName,
          data_nascimento: dateBorn.toLocaleDateString("pt-BR"),
          email: email,
          cpf: cpf,
          tipo: type,
          user_id: userCredential.user.uid,
          data_cadastro: (new Date()).toLocaleDateString("pt-BR"),
        });

        login(true, userCredential.user.uid, type);
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        console.log(error.message)
        if (error.message === "The email address is badly formatted.") {
          setError("O e-mail não é válido.")
        } else if (error.message === "The email address is already in use by another account.") {
          setError("O e-mail já está em uso.")
        } else {
          setError("Erro ao cadastrar. Tente novamente mais tarde.");
        }
        setVisible(true);
      });
  }

  function isValidCPF(cpf) {
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    cpf = cpf.split('').map(el => +el)
    const rest = (count) => (cpf.slice(0, count - 12)
      .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10
    return rest(10) === cpf[9] && rest(11) === cpf[10]
  }

  function handleSubmit() {
    if (password !== confirmPassword) {
      setError("Campos Senha e Confirmar senha não coincidem.");
      setVisible(true);
    } else {
      if (password.length < 8) {
        setError("Sua senha deve possuir no mínimo 8 dígitos.");
        setVisible(true);
      } else {
        checked ? setType("pesquisador") : setType("acs");
        if (isValidCPF(cpf)) {
          if (((new Date()).getFullYear - dateBorn.getFullYear) >= 18) {
            verifyUser();
          } else {
            setError("Você precisa ser maior que 18 anos para se cadastrar.");
            setVisible(true);
          }
        } else {
          setError("O CPF informado não é válido.");
          setVisible(true);
        }
      }
    }
  }

  //masks com Regex
  const maskCPF = value => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#AEBD91" }}>
      <Divider />
      <Layout style={styles.layout}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/img/logo.png')}
      />
        <QuestionText
          title={'Nome completo'}
          value={fullName}
          setText={newValue => setFullName(newValue)}
          type="default"
        />
        <QuestionDate
          title={'Data de nascimento'}
          value={dateBorn}
          setText={newValue => setDateBorn(newValue)}
        />
        <QuestionText
          title={'CPF'}
          value={cpf}
          setText={newValue => setCPF(maskCPF(newValue))}
          type="numeric"
        />
        <QuestionText
          title={'E-mail'}
          placeholder={'ex. example@example.com'}
          value={email}
          setText={newValue => setEmail(newValue)}
          type="email-address"
        />
        <SecureText
          value={password}
          label="Senha"
          setValue={setPassword}
          textRenderCaption="Sua senha precisa ter no mínimo 8 caracteres"
        />
        <SecureText
          value={confirmPassword}
          label="Confirmar senha"
          setValue={setConfirmPassword}
          textRenderCaption="Sua senha precisa ter no mínimo 8 caracteres"
        />
        <View style={styles.row}>
          <Text style={styles.textOption}>Sou ACS</Text>
          <Toggle checked={checked} onChange={check => setChecked(check)} />
          <Text style={styles.textOption}>Sou pesquisador(a)</Text>
        </View>
        {
          (email === '' || password === '' || confirmPassword === '' || nome_completo === '' || cpf === '')
            ?
            <Button style={styles.button} status='primary' disabled={true}>Cadastrar</Button>
            :
            <Button style={styles.button} status='primary' on onPress={handleSubmit}>Cadastrar</Button>
        }

      </Layout>
      <Button style={styles.button} status="warning" onPress={navigateLogin} appearance='ghost'>Voltar para login</Button>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text style={styles.text}>Erro: {error}</Text>
          <Button onPress={() => setVisible(false)}>
            OK
          </Button>
        </Card>
      </Modal>
    </View>
  );
};

