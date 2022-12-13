import React from 'react';
import { useNavigation } from "@react-navigation/native";
import CryptoJS from "react-native-crypto-js";
import useStore from "../../store/useStore";
import firebase from '../../config/firebase.js';
import { Text, ScrollView, SafeAreaView, Image, } from 'react-native';
import { Button, Layout, Modal, Card, IndexPath, } from '@ui-kitten/components';

import SecureText from "../components/secureEntry";
import { styles } from './stylesRegister';
import QuestionDate from '../components/componentDate';
import QuestionText from '../components/componentText';
import QuestionSelectOption from '../components/componentSelect';

export const RegisterScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [socialName, setSocialName] = React.useState('');
  const [dateBorn, setDateBorn] = React.useState(new Date());
  const [cpf, setCPF] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [type, setType] = React.useState('');
  const [typeUser, setTypeUser] = React.useState(new IndexPath(0));
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState(null);

  const login = useStore(state => state.login)

  const navigation = useNavigation();

  const database = firebase.firestore();

  const tipoUsuario = [
    "Selecione",
    "Agente Comunitário de Saúde",
    "Pesquisador",
  ];


  const navigateLogin = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCPF('');
    setDateBorn(new Date());
    setFullName('');
    setSocialName('')
    setCPF('');
    setTypeUser(new IndexPath(0));
    setVisible(false);
    setError('');
    navigation.navigate('Login');
  };

  function encrytpInformation(value) {
    const SECRET_KEY = process.env.SECRET_KEY;
    const encrypted = CryptoJS.AES.encrypt(
      value,
      SECRET_KEY,
    ).toString();

    return encrypted;
  }

  //valida entradas de registro
  function createUser() {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        database.collection("Usuario").add({
          nome_completo: encrytpInformation(fullName),
          nome_social: encrytpInformation(socialName),
          data_nascimento: encrytpInformation(dateBorn.toLocaleDateString("pt-BR")),
          telefone: encrytpInformation(telefone),
          email: encrytpInformation(email),
          cpf: encrytpInformation(cpf),
          tipo: encrytpInformation(type),
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

  const showMessage = (message) => {
    setError(message);
    setVisible(true);
  }

  // validações de entrada
  function isValidCPF(cpf) {
    if (typeof cpf !== 'string') {
      showMessage("Erro no campo CPF.");
      return false;
    }
    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      showMessage("CPF inválido.");
      return false;
    }
    cpf = cpf.split('').map(el => +el)
    const rest = (count) => (cpf.slice(0, count - 12)
      .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10

    if (rest(10) === cpf[9] && rest(11) === cpf[10]) return true

    showMessage("CPF inválido.");
    return false;

  }


  function isValidPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      showMessage("Campos Senha e Confirmar senha não coincidem.");
      return false;
    }
    else if (password.length < 8) {
      showMessage("Sua senha deve possuir no mínimo 8 dígitos.");
      return false;
    }
    return true;
  }

  function isValidAge(date) {
    if (((new Date()).getFullYear - dateBorn.getFullYear) < 18) {
      showMessage("Você precisa ser maior que 18 anos para se cadastrar.");
      return false;
    }
    return true;
  }

  function isValidTypeUser(typeUser) {
    if (typeUser.equals(0)) {
      showMessage("O tipo de usuário não foi selecionado.");
      return false;
    }

    return true;
  }

  function handleSubmit() {
    if ((isValidAge(dateBorn)
      && isValidCPF(cpf)
      && isValidTypeUser(typeUser)
      && isValidPassword(password, confirmPassword))) {
      typeUser.equals(1) ? setType("acs") : setType("pesquisador");
      createUser();
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

  const maskPhone = value => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.containerScroll}>
      <Layout style={styles.layoutOut}>
        <Layout style={styles.layoutImage}>
          <Image
            style={styles.tinyLogo}
            source={require('../../assets/img/logo.png')}
          />
        </Layout>
        <Layout style={styles.layoutIn}>
          <QuestionText
            title={'Nome completo *'}
            value={fullName}
            setText={newValue => setFullName(newValue)}
            type="default"
          />

          <QuestionText
            title={'Nome social'}
            value={socialName}
            setText={newValue => setSocialName(newValue)}
            type="default"
          />

          <QuestionDate
            title={'Data de nascimento *'}
            value={dateBorn}
            setText={newValue => setDateBorn(newValue)}
          />
          <QuestionText
            title={'CPF *'}
            value={cpf}
            setText={newValue => setCPF(maskCPF(newValue))}
            type="numeric"
          />
          <QuestionText
            title={'Telefone *'}
            value={telefone}
            setText={newValue => setTelefone(maskPhone(newValue))}
            type="numeric"
          />
          <QuestionText
            title={'E-mail *'}
            placeholder={'ex. example@example.com'}
            value={email}
            setText={newValue => setEmail(newValue)}
            type="email-address"
          />
          <SecureText
            value={password}
            label="Senha *"
            setValue={setPassword}
            textRenderCaption="Sua senha precisa ter no mínimo 8 caracteres"
          />
          <SecureText
            value={confirmPassword}
            label="Confirmar senha *"
            setValue={setConfirmPassword}
            textRenderCaption=""
          />

          <QuestionSelectOption
            title={'Tipo de usuário *'}
            data={tipoUsuario}
            value={typeUser}
            setValue={setTypeUser}
          />


          {
            (email === '' || password === '' || confirmPassword === '' || fullName === '' || cpf === '')
              ?
              <Button style={styles.button} status='primary' disabled={true}>Cadastrar</Button>
              :
              <Button style={styles.button} status='primary' on onPress={handleSubmit}>Cadastrar</Button>
          }

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
        </Layout>
        <Layout style={styles.layoutButtonRegister}>
            <Button
              style={styles.button}
              status='warning'
              onPress={navigateLogin} appearance='ghost'>
              Cancelar
            </Button>
          </Layout>
      </Layout>
      
    </ScrollView>
    </SafeAreaView>
  );
};

